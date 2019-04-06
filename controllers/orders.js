const stripe = require('stripe')('sk_test_OtgoKtVAUeJEdRNS0pFfunaI')
const Order = require('../models/order')

exports.post = (req, res) => {
    const stripeToken = req.body.stripeToken
    const currentCharges = Math.round(req.body.totalPrice * 100)

    stripe.customers
        .create({
            source: stripeToken.id
        })
        .then(function (customer) {
            return stripe.chargers.create({
                amount: currentCharges,
                currency: 'usd',
                customer: customer.id
            })
        })
        .then(function (charge) {
            const products = req.body.products

            let order = new Order()
            order.user = req.decoded.user._id
            order.totalPrice = currentCharges

            products.map(product => {
                order.products.push({
                    product: product.product,
                    quantity: product.quantity
                })
            })

            order.save()

            return res.status(201).json({
                success: true,
                message: 'Payment successful.'
            })
        })
}