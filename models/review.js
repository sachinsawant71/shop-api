const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    title: String,
    description: String,
    rating: {
        type: Number,
        default: 0
    },
    created: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Review', reviewSchema)