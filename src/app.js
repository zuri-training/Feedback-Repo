const path = require('path')
const express = require('express')
const app = express();
const dotenv = require('dotenv')
const session = require('express-session')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const userRouter = require('./routers/userRouter')
const hbs = require('hbs')
const feedbackformRoute = require('./routers/feedBackFormroute')
const productFeedbackRoute = require('./routers/productFeedbackRoute');
const eventFeedbackRoute = require('./routers/eventFeedbackRoute');
const serviceFeedbackRoute = require('./routers/serviceFeedbackRoute')
const connectDB = require('./config/mongoose');
const isAuth = require('./middleware/auth')
// const { default: isEmail } = require('validator/lib/isEmail');


// log requests
app.use(morgan('tiny'))
app.use(express.urlencoded({extended: true}))
app.set('view engine', "hbs")
//defining path for express to serve our views
const publicPath = path.join(__dirname, 'public')  // I removed ../ from the from the public: '../public to serve the file in public'
const viewsPath = path.join(__dirname, './views')

// connecting to config file
dotenv.config({path:'config.env'})

//setup for our views location
app.set('views', viewsPath)


// Setup static directory to serve
app.use(express.static(publicPath))

// mongoDB connection
connectDB()

//setting up node to use session to authenticate user
app.use(session({
    secret: process.env.SESS_SECRET,
    cookie: { maxAge: 3600000 },
    resave: true,
    saveUninitialized: true,
}))

// parse requests to bodyParser
app.use(bodyParser.json())

app.use(userRouter);
app.use(feedbackformRoute);
app.use('/api/v1/productfeedback', productFeedbackRoute)
app.use('/api/v1/productfeedback/:id', productFeedbackRoute)
app.use('/api/v1/eventfeedback', eventFeedbackRoute)
app.use('/api/v1/eventfeedback/:id', eventFeedbackRoute)
app.use('/api/v1/servicefeedback', serviceFeedbackRoute)
app.use('/api/v1/servicefeedback/:id', serviceFeedbackRoute)

app.get('/', (request, response) => {
    response.status(200).render('index')
})

app.get('/feedback', isAuth, (request, response) => {
    response.status(200).render('feedback')
})

app.get('/detailproductfeedback/:id', isAuth, (request, response) => {
    let id = request.params.id
    response.status(200).render('detailproductfeedback', {
        formId: id
    })
})

app.get('/detailservicefeedback/:id', isAuth, (request, response) => {
    let id = request.params.id
    response.status(200).render('detailservicefeedback', {
        formId: id
    }) 
})

app.get('/detaileventfeedback/:id', isAuth, (request, response) => {
    let id = request.params.id
    response.status(200).render('detaileventfeedback', {
        formId: id
    }) 
})

//routes that handles the embeded pages starts from here
app.get('/embededservicefeedbackform', (request, response) => {
    response.status(200).render('embedservicefeedback', {
    }) 
})

app.get('/embededproductfeedbackform', (request, response) => {
    response.status(200).render('embedproductfeedback', {
    }) 
})

app.get('/embededeventfeedbackform', (request, response) => {
    response.status(200).render('embedeventfeedback', {
    }) 
})

app.get('/detailservicefeedback', (request, response) => {
    response.status(200).render('detailservicefeedback', {
    }) 
})

app.get('/detailproductfeedback', (request, response) => {
    response.status(200).render('detailproductfeedback', {
    }) 
})


app.get('/detaileventfeedback', (request, response) => {
    response.status(200).render('detaileventfeedback', {
    }) 
})

//routes that handles the embeded pages ends here

app.get('/customform', isAuth, (request, response) => {
    response.render('customform')
})







// app.get ('*', (req, res) => {
//     res.render('404',{
//         title: '404 page',
//         errorMessage: 'page not found'
//     })
// })

module.exports = app;

//Pending to do lists:
// Connect to the database: Done
// Link the authentication.
// Host our project
//Connect each feedback template to the API to enable user to perform Crud operation
//Dynamically generate unique code for each template.
//Enable each user to download