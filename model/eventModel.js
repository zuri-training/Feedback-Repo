const mongoose = require('mongoose');
const eventFeedbackSchema = new mongoose.Schema({
    rating: Number,
    comment: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },

    updatedAt: {
        type: Date,
        default: Date.now()
    }

})


module.exports = mongoose.model('event', eventFeedbackSchema)