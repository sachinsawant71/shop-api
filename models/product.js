const mongoose = require('mongoose')
const Schema = mongoose.Schema

const deepPopulate = require('mongoose-deep-populate')(mongoose)

const productSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
    imageId: {
        type: String,
        default: 'sample.jpg'
    },
    imageVersion: {
        type: String,
        default: '1552902034'
    },
    title: String,
    description: String,
    price: Number,
    created: {
        type: Date,
        default: Date.now()
    }
})

productSchema.plugin(deepPopulate)

module.exports = mongoose.model('Product', productSchema)