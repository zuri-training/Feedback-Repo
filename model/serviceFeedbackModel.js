const mongoose = require('mongoose');
const ServiceFeedbackSchema = new mongoose.Schema ({
    title: String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    link: String,
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})





module.exports = mongoose.model('ServiceFeedback', ServiceFeedbackSchema)