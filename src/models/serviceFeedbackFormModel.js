const mongoose = require('mongoose');
const ServiceFeedbackSchema = new mongoose.Schema({
    formTitle: String,
    owner: String,
    respNum: Number,
    createdAt: {
        type: Date,
        default: Date.now()
    },

    updatedAt: {
        type: Date,
        default: Date.now()
    }


})





module.exports = mongoose.model('ServiceFeedback', ServiceFeedbackSchema)