const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const userRouter = require('./routers/userRouter')


const app = express()

// log requests
app.use(morgan('tiny'))


//defining path for express to serve our views
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, './views')

//setup for our views location
app.set('views', viewsPath)

// Setup static directory to serve
app.use(express.static(publicPath))
app.use(bodyParser.json())

app.use(userRouter);


app.get ('*', (req, res) => {
    res.render('404',{
        title: '404 page',
        errorMessage: 'page not found'
    })
})

module.exports = app;