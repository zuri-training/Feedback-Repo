const EventFeedbackSchema = require('../models/eventFeedbackFormModel')
const ProductFeedbackSchema = require('../models/productFeedbackFormModel')
const ServiceFeedbackSchema = require('../models/serviceFeedbackFormModel')


const post_createEventForm = async (request, response) => {
    try {
        let id = request.session.user._id
        const event = await EventFeedbackSchema.findOne({formTitle: 'Event Feedback'})

        if(event) {
            response.redirect('/profile')
        }

        const form = await new EventFeedbackSchema({
            formTitle: 'Event Feedback',
            owner: id
        })

        await form.save()
        response.redirect('/detaileventfeedback')
    } catch (error) {
        console.log(error)
    }

    
}

const post_createServiceForm = async (request, response) => {
    try {
        let id = request.session.user._id
        const service = await ServiceFeedbackSchema.findOne({formTitle: 'Service Feedback'})

        if(service) {
            response.redirect('/profile')
        }

        const form = await new ServiceFeedbackSchema({
            formTitle: 'Service Feedback',
            owner: id
        })

        await form.save()
        response.redirect('/detailservicefeedback')
    } catch (error) {
        console.log(error)
    }

}

const post_createProductForm = async (request, response) => {

    try {
        let id = request.session.user._id
        const product = await ProductFeedbackSchema.findOne({formTitle: 'Service Feedback'})

        if(product) {
            response.redirect('/profile')
        }

        const form = await new ProductFeedbackSchema({
            formTitle: 'Product Feedback',
            owner: id
        })

        await form.save()
        response.redirect('/detailservicefeedback')
    } catch (error) {
        console.log(error)
    }


}

module.exports = {

    post_createEventForm,
    post_createServiceForm,
    post_createProductForm,
    

}