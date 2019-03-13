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

app.use('/api/accounts', authRoutes)