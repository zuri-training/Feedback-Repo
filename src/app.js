const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const userRouter = require('./routers/userRouter')
const productFeedbackRoute = require('./routers/productFeedbackRoute');
const eventFeedbackRoute = require('./routers/eventFeedbackRoute');
const serviceFeedbackRoute = require('./routers/serviceFeedbackRoute')


const app = express();

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
app.use('/api/v1/productfeedback', productFeedbackRoute)
app.use('/api/v1/productfeedback/:id', productFeedbackRoute)
app.use('/api/v1/eventfeedback', eventFeedbackRoute)
app.use('/api/v1/eventfeedback/:id', eventFeedbackRoute)
app.use('/api/v1/servicefeedback', serviceFeedbackRoute)
app.use('/api/v1/servicefeedback/:id', serviceFeedbackRoute)


app.get ('*', (req, res) => {
    res.render('404',{
        title: '404 page',
        errorMessage: 'page not found'
    })
})

module.exports = app;