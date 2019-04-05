const express = require('express')
const mongoose = require('mongoose')
const http = require('http');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const config = require('./config')

const app = express()
const port = config.port
const server = http.createServer(app)
const io = require('socket.io')(server)

// app headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, X-Request-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
})

app.use(express.json({
    limit: '50mb'
}))
app.use(express.urlencoded({
    extended: true,
    limit: '50mb'
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(morgan('dev'))

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

require('./socket/app')(io)
server.listen(port)


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