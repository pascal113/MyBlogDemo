import mongoose from 'mongoose'
import imagesSchema from '../schemas/images'

module.exports = mongoose.model('Images',imagesSchema);