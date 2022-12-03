const mongoose = require('mongoose');
const ProductFeedbackTemplate = new mongoose.Schema({
    Name: String,
    Email: {
        type: String,
        required: true,
    },
    comment: String,

})


module.exports = mongoose.model('ProductFeedbackTemplate', ProductFeedbackTemplate)