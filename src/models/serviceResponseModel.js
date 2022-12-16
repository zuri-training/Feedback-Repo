const mongoose = require('mongoose');
const ServiceRespSchema = new mongoose.Schema ({
    Title: String,
    Description: String,
    formId: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('ServiceResp', ServiceRespSchema)