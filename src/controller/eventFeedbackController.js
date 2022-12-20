const EventFeedbackSchema = require('../models/eventFeedbackFormModel')
const eventResponseShema = require('../models/eventResponseModel')

//get all the event feedback form.
const getAllEventFeedBackForms = async (request, response) => {
    try {
        const feedback = await EventFeedbackSchema.find({})
        // response.status(200).json({feedback})
        response.redirect('/profile')
    } catch (error) {
        response.status(500).json({feedback})
    }
}

 //  storing participant response.
const userRes = async (request, response) => {
    console.log(request.body)
    try {
        
        // let id = request.session.user._id
        const eventFeedback = await EventFeedbackSchema.findOne({_id: request.body.id })

        const userResp = new eventResponseShema({
            ...request.body,
            formId: eventFeedback._id
        })

        await userResp.save();

        const allResp = await eventResponseShema.find({ formId: eventFeedback._id })

        let length = allResp.length

        const feedLen = await EventFeedbackSchema.findByIdAndUpdate({_id: eventFeedback._id }, {respNum: length})
       
        await feedLen.save()
        // console.log(userResp)
        // console.log(feedLen)

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