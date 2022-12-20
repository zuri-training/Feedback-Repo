const ServiceFeedbackSchema = require('../../src/models/serviceFeedbackFormModel')
const serviceResponseShema = require('../models/serviceResponseModel')

//get all the service feedback form.
const getAllServiceFeedBackForms = async (request, response) => {
    try {
        const serviceFeedback = await ServiceFeedbackSchema.find({})
        // response.status(200).json({serviceFeedback})
        response.redirect('/profile')
    } catch (error) {
        response.status(500).json({serviceFeedback})
    }
}

 //  create a new service feedback form.
const createServiceFeedbackForm = async (request, response) => {
    // console.log(request.body)
    try {
        // let id = request.body.id
        const serviceFeedback = await ServiceFeedbackSchema.findOne({_id: request.body.id })
        
        const userResp = await serviceResponseShema.create(
            {
                Title: request.body.title,
                Description: request.body.description,
                formId: serviceFeedback._id,
            })


            const allResp = await serviceResponseShema.find({ formId: serviceFeedback._id })

            let length = allResp.length
    
            const feedLen = await ServiceFeedbackSchema.findByIdAndUpdate({_id: serviceFeedback._id }, {respNum: length})
            await feedLen.save()

            // console.log(userResp)

        response.status(201).redirect('/profile')
    } catch (error) {
        // response.status(404).json({message: error})
        console.log(error)
    }
    
}

//get a single service feedback form.
const getSingleServiceFeedbackForm = async (request, response) => {
    try {
    const{ id: serviceFeedbackID} = request.params
    const foundServiceFeedback = await ServiceFeedbackSchema.findOne({_id:serviceFeedbackID})
    if(!foundServiceFeedback){
        return response.status(404).json({message: `No feedbackform with Id: ${serviceFeedbackID}`})
    }
    response.status(200).json({foundServiceFeedback})
    } catch (error) {
        response.status(500).json({message: error})
    }
}


//update the service feedback form details.
const updateServiceFeedbackForm = async (request, response) => {
    try {
        const{id: serviceFeedbackID} = request.params
        const updatedServiceFeedback = await ServiceFeedbackSchema.findOneAndUpdate({_id: serviceFeedbackID}, request.body)
        if(!updatedServiceFeedback){
            return response.status(404).json({message: `can not be found`})
        }
        response.status(200).json({updatedServiceFeedback})
    } catch (error) {
        response.status(500).json({message: error})
    }
}

// delete a single service feedback form.
const deleteServiceFeedbackForm = async (request, response) => {
   try {
    const {id: serviceFeedbackID} = request.params
    const deletedServiceFeedback = await ServiceFeedbackSchema.findOneAndDelete({_id: serviceFeedbackID})
    if(!deleteServiceFeedbackForm){
        return response.status(404).json({Message: `No feedback form with such id: ${serviceFeedbackID}`})
    }
      response.status(200).json({deletedServiceFeedback})
   } catch (error) {
      response.status(500).json({message: error})
   }
   
}




module.exports = {
    getAllServiceFeedBackForms,
    createServiceFeedbackForm,
    getSingleServiceFeedbackForm,
    updateServiceFeedbackForm,
    deleteServiceFeedbackForm
}
