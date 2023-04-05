import Express from 'express'
const router = Express.Router();

router.get('/',(req,res)=>{
    res.send('Process backend API')
});

module.exports = router;