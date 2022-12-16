const EventFeedbackSchema = require('../models/eventFeedbackFormModel')
const eventResponseShema = require('../models/eventResponseModel')

//get all the event feedback form.
const getAllEventFeedBackForms = async (request, response) => {
    try {
        const feedback = await EventFeedbackSchema.find({})
        response.status(200).json({feedback})
    } catch (error) {
        response.status(500).json({feedback})
    }
}

 //  storing participant response.
const userRes = async (request, response) => {
    console.log(request.body)
    try {
        
        let id = request.session.user._id
        const eventFeedback = await EventFeedbackSchema.findOne({owner: id })

        if(!eventFeedback) {
            console.error('form not found')
        }

        const userResp = new eventResponseShema({
            ...request.body,
            formId: eventFeedback._id
        })


        await userResp.save();

        console.log(userResp)

        response.status(201).redirect('/profile')
    } catch (error) {
        console.log(error)
    }
    
}

//get a single event feedback form.
const getSingleEventFeedbackForm = async (request, response) => {
    try {
    const{id: feedbackID} = request.params
    const foundFeedback = await EventFeedbackSchema.findOne({_id:feedbackID})
    if(!foundFeedback){
        return response.status(404).json({message: `No feedbackform with Id: ${feedbackID}`})
    }
    response.status(200).json({foundFeedback})
    } catch (error) {
        response.status(500).json({message: error})
    }
}


//update the event feedback form details.
const updateEventFeedbackForm = async (request, response) => {
    try {
        const{id:feedbackID} = request.params
        const updatedFeedback = await FeedbackSchema.findOneAndUpdate({_id: feedbackID}, request.body)
        if(!updatedFeedback){
            return response.status(404).json({message: `can not be found`})
        }
        response.status(200).json({updatedFeedback})
    } catch (error) {
        response.status(500).json({message: error})
    }
}

// delete a single event feedback form.
const deleteEventFeedbackForm = async (request, response) => {
   try {
    const {id: feedbackID} = request.params
    const deletedEventFeedbackForm = await EventFeedbackSchema.findOneAndDelete({_id:feedbackID})
    if(!deleteFeedbackForm){
        return response.status(404).json({Message: `No feedback form with such id: ${feedbackID}`})
    }
      response.status(200).json({deletedEventFeedback})
   } catch (error) {
      response.status(500).json({message: error})
   }
   
}




module.exports = {
    getAllEventFeedBackForms,
    userRes,
    getSingleEventFeedbackForm,
    updateEventFeedbackForm,
    deleteEventFeedbackForm
}