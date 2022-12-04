const mongoose = require('mongoose');
const ServiceFeedbackSchema = new mongoose.Schema ({
    title: String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },

    updatedAt: {
        type: Date,
        default: Date.now()
    }
})





module.exports = mongoose.model('ServiceFeedbackTemplate', ServiceFeedbackSchema)