const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const app = express()
const session = require('express-session')
const bodyParser = require('body-parser')
require('dotenv').config()
    //connectiong with db 
mongoose.connect(process.env.DATABASE_ADDRESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(db => {
    console.log('connect database')
}).catch(err => {
    console.log('error: to try connect ', err)
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(morgan('combined'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.use('/', require('./routes/index'))
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

const port = process.env.PORT || process.env.SERVER_PORT
app.listen(port, () => {
    console.log(`connect on port: ${port}`)
})