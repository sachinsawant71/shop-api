const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(morgan('dev'))
app.use(cors())

// mongo connection
mongoose.Promise = global.Promise
mongoose.connect(config.database, {
    useNewUrlParser: true
}).then(() => {
    console.log('Connected to database');
}).catch(() => {
    console.log('Connection error');
})
mongoose.set('useCreateIndex', true);

app.listen(config.port, (err) => {
    console.log('Listening on port ' + config.port);
})


//routes
const authRoutes = require('./routes/auth')
const profileRoutes = require('./routes/profile')
const addressRoutes = require('./routes/address')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const reviewRoutes = require('./routes/review')
const searchRoutes = require('./routes/product-search')

app.use('/api/accounts', authRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/address', addressRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/products', productRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/search', searchRoutes)