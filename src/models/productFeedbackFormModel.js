const mongoose = require('mongoose');
const ProductFeedbackSchema = new mongoose.Schema({
    formTitle: String,
    owner: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model('ProductFeedback', ProductFeedbackSchema)