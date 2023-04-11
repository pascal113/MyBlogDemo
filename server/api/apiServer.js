/**
 * api request server
 *
 * 0：success
 * 1：data type wrong
 * 2：client data wrong
 * 3：backend wrong
 */
import Express from 'express'
import config from '../../config/config'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import User from '../../models/user'
import {MD5_SUFFIX,md5} from '../util'

const port = config.apiPort;

const app = new Express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser('express_react_cookie'));
app.use(session({
    secret:'express_react_cookie',
    resave: true,
    saveUninitialized:true,
    cookie: {maxAge: 60 * 1000 * 30}//expire time
}));


const multer = require('multer');

// const fs = require('fs');

// try {
//   fs.readdirSync('uploads');
// } catch (error) {
//   console.error('if no uploads folder, make uploads folder.');
//   fs.mkdirSync('uploads');
// }

// const upload = multer({
//   storage: multer.diskStorage({
//     destination(req, file, done) {
//       done(null, 'uploads/');
//     },
//     filename(req, file, done) {
//       const ext = path.extname(file.originalname);
//       done(null, path.basename(file.originalname, ext) + Date.now() + ext);
//     },
//   }),
//   limits: { fileSize: 5 * 1024 * 1024 },
// });

const upload = multer({ 
    dest: 'static/uploads/',
    limits: { fileSize: 5 * 1024 * 1024 }
});

app.get('/upload', (req, res) => {
    console.log('get upload');    
    res.send('ok');
});

// app.post('/upload', upload.single('file'), (req, res) => {
app.post('/upload', upload.single('image'), (req, res) => {
    console.log('post upload');
    console.log(req.file);
    res.send('ok');
});

const SibApiV3Sdk = require('sib-api-v3-sdk');

app.post('/sendEmail', (req, res) => {
    console.log('post sendEmail');
    console.log(req.body);
    let {
        subject,
        sender,
        to
    } = req.body;

    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = '<html><body><h1>Test email</h1></body></html>';
    sendSmtpEmail.sender = {
        name: 'Sender Name',
        email: sender
    };
    sendSmtpEmail.to = [{
        name: 'Recipient Name',
        email: to
    }];

    console.log(sendSmtpEmail);

    apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
        console.log('API call successful. Returned data: ' + JSON.stringify(data));
        res.send('ok');
    }, function(error) {
        console.error(error);
        res.send('error');
    });    

    res.send('ok');
});

//blog rounter
app.use('/', require('./main'));
//admin router
app.use('/admin', require('./admin'));

mongoose.Promise = require('bluebird');
mongoose.connect(`mongodb://${config.dbHost}:${config.dbPort}/blog`, function (err) {
    if (err) {
        console.log(err, 'Connect database error');
        return;
    }
    console.log('Connect database success');

    User.findOne({username: 'admin'}).then(data => {
        if (data) {
            console.log('admin user is already!')
            return;
        }
        
        let user = new User({
            username: 'admin',
            password: md5('admin' + MD5_SUFFIX),
            type: 'admin'
        });

        user.save().then(function () {
            console.log('Admin user register successs ');  
        }).cancel(err=>{
            console.log('Admin user register fail ', err);                
        });
    }).catch(err => {
        console.log('Get admin info error!');
        return;
    });

    app.listen(port, function (err) {
        if (err) {
            console.error('err:', err);
        } else { 
            let defaultClient = SibApiV3Sdk.ApiClient.instance;

            // Configure API key authorization: api-key
            let apiKey = defaultClient.authentications['api-key'];
            apiKey.apiKey = config.mailApiKey;

            // Configure API key authorization: partner-key
            let partnerKey = defaultClient.authentications['partner-key'];
            partnerKey.apiKey = config.mailApiKey;

            let api = new SibApiV3Sdk.AccountApi();
            api.getAccount().then(function(data) {
                console.log('API called successfully. Returned data: ' + data);
                console.log(data);
            }, function(error) {
                console.error(error);
            });
            
            console.info('===> api server is running at ${config.apiHost}:${config.apiPort}')
        }
    });
});
