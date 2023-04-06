import Express from 'express'

const router = Express.Router();
import Images from '../../models/images'
import {responseClient} from '../util'

router.post('/addImage', function (req, res) {
    const {
        type,
        description
    } = req.body;
    const path =  `/${Math.round(Math.random() * 9 + 1)}.jpg`;

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

router.get('/delImage',(req,res)=>{
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