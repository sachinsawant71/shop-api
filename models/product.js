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
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
})

productSchema
    .virtual('averageRating')
    .get(function () {
        let rating = 0
        if (this.reviews.length == 0) {
            rating = 0
        } else {
            this.reviews.map((review) => {
                rating += review.rating
            })
            rating = rating / this.reviews.length
        }

        return rating
    })

productSchema.plugin(deepPopulate)

module.exports = mongoose.model('Product', productSchema)