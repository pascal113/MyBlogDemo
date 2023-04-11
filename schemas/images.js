/**
 * images 表结构
 **/

import mongoose from 'mongoose'

module.exports = new mongoose.Schema({    
    path:String,
    type:String, 
    description:String   
});