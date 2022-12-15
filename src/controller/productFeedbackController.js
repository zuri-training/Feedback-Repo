const ProductFeedbackSchema = require('..//models/productFeedbackFormModel')

//get all the product feedback form.
const getAllProductFeedBackForms = async (request, response) => {
    try {
        const feedback = await ProductFeedbackSchema.find({})
        response.status(200).json({feedback})
    } catch (error) {
        response.status(500).json({feedback})
    }
}

 //  create a new product feedback form.
const createProductFeedbackForm = async (request, response) => {
    try {
        const feedback = await ProductFeedbackSchema.create({
            Name: request.body.name,
            Email: request.body.email,
            Comment: request.body.comment
        })
         response.status(201).send((`Thank you for complete the product feedback form. We sincerely appreciate your feedback and promise to improve on our product`))
        
    } catch (error) {
        response.status(404).json({message: error})
    }
    
}

//get a single product feedback form.
const getSingleProductFeedbackForm = async (request, response) => {
    try {
    const{id: feedbackID} = request.params
    const foundFeedback = await ProductFeedbackSchema.findOne({_id:feedbackID})
    if(!foundFeedback){
        return response.status(404).json({message: `No feedbackform with Id: ${feedbackID}`})
    }
    response.status(200).json({foundFeedback})
    } catch (error) {
        response.status(500).json({message: error})
    }
}


//update the product feedback form details.
const updateProductFeedbackForm = async (request, response) => {
    try {
        const{id:feedbackID} = request.params
        const updatedFeedback = await ProductFeedbackSchema.findOneAndUpdate({_id: feedbackID}, request.body)
        if(!updatedFeedback){
            return response.status(404).json({message: `can not be found`})
        }
        response.status(200).json({updatedFeedback})
    } catch (error) {
        response.status(500).json({message: error})
    }
}

// delete a single product feedback form.
const deleteProductFeedbackForm = async (request, response) => {
   try {
    const {id: feedbackID} = request.params
    const deletedFeedback = await ProductFeedbackSchema.findOneAndDelete({_id:feedbackID})
    if(!deleteFeedbackForm){
        return response.status(404).json({Message: `No feedback form with such id: ${feedbackID}`})
    }
      response.status(200).json({deletedFeedback})
   } catch (error) {
      response.status(500).json({message: error})
   }
   
}




module.exports = {
    getAllProductFeedBackForms,
    createProductFeedbackForm,
    getSingleProductFeedbackForm,
    updateProductFeedbackForm,
    deleteProductFeedbackForm
}