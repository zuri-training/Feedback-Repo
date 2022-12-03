const mongoose = require('mongoose');
const ServiceFeedbackTemplate = new mongoose.Schema ({
    title: String,
    description: String,
    
})





module.exports = mongoose.model('ServiceFeedbackTemplate', ServiceFeedbackTemplate)