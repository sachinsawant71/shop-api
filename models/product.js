const mongoose = require('mongoose')
const Schema = mongoose.Schema

const deepPopulate = require('mongoose-deep-populate')(mongoose)
const algolia = require('mongoose-algolia')

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
/*productSchema.plugin(algolia, {
    appId: '0NMEYF15P1',
    apiKey: '712fb0c14159120f0ecba8c1a60bf686',
    indexName: 'shop',
    selector: '_id title imageId imageVersion reviews description price user created averageRating',
    populate: {
        path: 'user reviews',
        select: 'name rating',
    },
    defaults: {
        author: 'unknown'
    },
    mappings: {
        title: function (value) {
            return `${value}`
        }
    },
    virtuals: {
        averageRating: function (doc) {
            let rating = 0
            if (doc.reviews.length == 0) {
                rating = 0
            } else {
                doc.reviews.map((review) => {
                    rating += review.rating
                })
                rating = rating / doc.reviews.length
            }

            return rating
        }
    },
    debug: true
})
*/
let Model = mongoose.model('Product', productSchema)
/*Model.SyncToAlgolia()
Model.SetAlgoliaSettings({
    searchableAttributes: ['title']
})*/
module.exports = Model