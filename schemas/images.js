/**
 * images 表结构
 **/

import mongoose from 'mongoose'

module.exports = new mongoose.Schema({    
    path:String,//封面图片
    type:String, //作者
    description:String //文章标题    
});