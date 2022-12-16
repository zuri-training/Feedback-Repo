const mongoose = require('mongoose');
const eventRespSchema = new mongoose.Schema({
    
    rating: Number,
    comment: String,
    formId: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }

})


module.exports = mongoose.model('EventResp', eventRespSchema)