import Express from 'express'

const router = Express.Router();
import Article from '../../models/article'
import {responseClient} from '../util'

router.post('/addArticle', function (req, res) {
    const {
        title,
        content,
        time,
        tags,
        isPublish
    } = req.body;
    const author = req.session.userInfo.username;
    const coverImg =  `/${Math.round(Math.random() * 9 + 1)}.jpg`;
    const viewCount = 0;
    const commentCount = 0;
    let tempArticle = new Article({
        title,
        content,
        isPublish,
        viewCount,
        commentCount,
        time,
        author,
        coverImg,
        tags:tags.split(',')
    });
    tempArticle.save().then(data=>{
        responseClient(res,200,0,'Save success',data)
    }).cancel(err=>{
        console.log(err);
        responseClient(res);
    });
});

router.post('/updateArticle',(req,res)=>{
    const {
        title,
        content,
        time,
        tags,
        isPublish,
        id
    } = req.body;
    Article.update({_id:id},{title,content,time,tags:tags.split(','),isPublish})
        .then(result=>{
            console.log(result);
            responseClient(res,200,0,'Update success',result)
        }).cancel(err=>{
        console.log(err);
        responseClient(res);
    });
});

router.get('/delArticle',(req,res)=>{
    let id = req.query.id;
    Article.remove({_id:id})
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