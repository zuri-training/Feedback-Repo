const mongoose = require('mongoose');
const eventFeedbackSchema = new mongoose.Schema({
    formTitle: String,
    owner: String,
    respNum: Number,
    createdAt: {
        type: Date,
        default: Date.now()
    }

})


module.exports = mongoose.model('eventFeedback', eventFeedbackSchema)