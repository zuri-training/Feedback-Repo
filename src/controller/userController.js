const User = require('../models/user')
const EventFeedback = require('../models/eventFeedbackFormModel')
const eventResponse = require('../models/eventResponseModel')
const ServiceFeedback = require('../models/serviceFeedbackFormModel')
const serviceResponse = require('../models/serviceResponseModel')
const ProductFeedback = require('../models/productFeedbackFormModel')
const productResponse = require('../models/eventResponseModel')
// const eventFeedbackFormModel = require('../models/eventFeedbackFormModel')


// const JWT_SECRET='sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

const get_signup = (request, response) => {
    response.render('register')
}

const post_signup = async (request, response) => {
	// console.log(request.body)
    try {
        const user = await User.findOne({email: request.body.email})

        if(user) {
            response.redirect('/login')
        }

        await User.create({
            fullname:request.body.fullname,
            email: request.body.email,
            password: request.body.password
        })
       
        response.status(201).redirect('/login')
    } catch (e) {
        response.redirect('/signup')
        console.log(e)
    }
}

const get_login = (request, response) => {
    response.render('signin')
}

const post_login = async (request, response) => {
    // console.log(request.body)
    try {
        const user = await User.findByCredentials(request.body.email, request.body.password)
        if (!user){
            response.redirect('/login',{
                e: e
            })
        }
        request.session.user = user;
        response.redirect('/profile')
    } catch (e) {
        response.render('login',{
            e: e
        })
    }
}

const get_profile = async (request, response) => {
    let allFeed
    let feedLen
    try {

        const event = await EventFeedback.find({ owner: request.session.user._id })
        

        if(!event){
            console.log('empty event')
        }else(
            
            allFeed = event
        )

        const service = await ServiceFeedback.find({ owner: request.session.user._id })

        if(!service){
            console.log('empty event')
        }else(
            allFeed.push(...service)
        )

        const product = await ProductFeedback.find({ owner: request.session.user._id })

        if(!product){
            console.log('empty event')
        }else(
            allFeed.push(...product)
        )


        feedLen = allFeed.length

        if(feedLen === 0) {
            response.redirect('/profile&%0')
        }

        let user = request.session.user
        // console.log(allFeed)
        response.render('profile' , {feeds: {allFeed}, user})
    } catch (error) {
        console.log(error)
    }

//     response.render('profile')

}

const get_noForm = async (request, response) => {
    let feedLen = true
    let form = 'No Form Create'
    response.render('profile', {feedLen, mess: form} )

}

const formResp = async (request, response) => {
    const id = request.params.id
    // console.log(request.params)
    
    const event = await EventFeedback.findById({_id: id})
    const service = await ServiceFeedback.findById({_id: id})
    const product = await ProductFeedback.findById({_id: id})

    if(event) {
        response.redirect(`/profile/eventresponse/${event._id}`)
    }else if(service) {
        response.redirect(`/profile/serviceresponse/${service._id}`)
    }else{
        response.redirect(`/profile/productresponse/${product._id}`)
    }
}

const get_eventResp =  async (request, response) => {

    // console.log(request.params)
    
    const usersResp = await eventResponse.find({ formId: request.params.id })
    // console.log(usersResp)

    response.render('formresponsepage', { resp:{ usersResp}, event: 'Event'})
}

const get_serviceResp = async (request, response) => {

    const usersResp = await serviceResponse.find({ formId: request.params.id })
    // console.log(usersResp)

    response.render('formresponsepage', { resp:{ usersResp}, service: 'service'})

}


const get_productResp = async (request, response) => {

    const usersResp = await productResponse.find({ formId: request.params.id })
    // console.log(usersResp)

    response.render('formresponsepage', { resp:{ usersResp}, product: 'product'})


}



module.exports = {
	get_signup,
	post_signup,
	get_login,
	post_login,
    get_profile,
    get_noForm,
    formResp,
    get_eventResp,
	get_serviceResp,
	get_productResp
}