const express = require('express');
const {
    post_createEventForm,
    post_createServiceForm,
    post_createProductForm,
} = require('../controller/feedBackFormController');
const router = express.Router();

router.get('/servicefeedback', post_createServiceForm)
router.get('/eventfeedback', post_createEventForm)
router.get('/productfeedback', post_createProductForm)


module.exports = router;