import Express from 'express'

const router = Express.Router();
import Images from '../../models/images'
import {responseClient} from '../util'

console.log('import images');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('destination');
    cb(null, 'static/uploads/');
  },
  filename: function (req, file, cb) {
    console.log('filename');
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
});

const upload = multer({ storage: storage });
// const upload = multer({ 
//     dest: 'static/uploads/',
//     limits: { fileSize: 5 * 1024 * 1024 }
// });

router.post('/addImage', upload.single('image'), (req, res)  => {
    
    console.log('post addImage');
    console.log(req.file);

    const {
        type,
        description
    } = req.body;
    let path =  req.file.filename;

    let tempImages = new Images({
        path,
        type,
        description
    });

    tempImages.save().then(data=>{
        responseClient(res,200,0,'Save success',data)
    }).cancel(err=>{
        console.log(err);
        responseClient(res);
    });
});

router.post('/updateImage',(req,res)=>{
    const path =  `/${Math.round(Math.random() * 9 + 1)}.jpg`;
    const {
        type,
        description
    } = req.body;
    Images.update({_id:id},{path, type,description})
        .then(result=>{
            console.log(result);
            responseClient(res,200,0,'Update success',result)
        }).cancel(err=>{
        console.log(err);
        responseClient(res);
    });
});

router.get('/getAllImages', (req, res) => {
    console.log('getAllImages');
    Images.find(null, 'name').then(data => {
        responseClient(res, 200, 0, 'Request success!', data);
    }).catch(err => {
        responseClient(res);
    })
});

router.delete('/delImage',(req,res)=>{
    let id = req.query.id;
    Images.remove({_id:id})
        .then(result=>{
            if(result.result.n === 1){
                responseClient(res,200,0,'Delete success!')
            }else{
                responseClient(res,200,1,'Content not exist');
            }
        }).cancel(err=>{
            responseClient(res);
    })
});

module.exports = router;