import Express from 'express'
const router = Express.Router();
import User from '../../models/user'
import {responseClient} from '../util'

//admin request to backend
router.use( (req,res,next) =>{
    console.log('check router');
    next();
    // if(req.session.userInfo){
    //     next()
    // }else{
    //     res.send(responseClient(res,200,1,'Information is out. Please retry input.'));
    // }
});

router.use('/images',require('./images'));
router.use('/tags',require('./tags'));
router.use('/article',require('./article'));
router.get('/getUsers',(req,res)=>{
    let skip =(req.query.pageNum-1)<0?0:(req.query.pageNum-1)*10;
    let responseData = {
        total:0,
        list:[]
    };
    User.count()
        .then(count=>{
            responseData.total = count;
            User.find(null,'_id username type password',{skip:skip,limit:10})
                .then((result)=>{
                responseData.list = result;
                    responseClient(res,200,0,'',responseData)
                })
                .catch(err=>{
                    responseClient(res);
                })
        });
});

module.exports = router;