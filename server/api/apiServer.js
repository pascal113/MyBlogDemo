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
const fs = require('fs');

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('if no uploads folder, make uploads folder.');
  fs.mkdirSync('uploads');
}

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

const upload = multer({ dest: 'uploads/' });

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

    app.listen(port, function (err) {
        if (err) {
            console.error('err:', err);
        } else {
            console.info('===> api server is running at ${config.apiHost}:${config.apiPort}')
        }
    });
});
