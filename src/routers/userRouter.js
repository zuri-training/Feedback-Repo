const express = require('express')
const {
    get_signup,
	post_signup,
	get_login,
	post_login,
	get_profile,
	formResp,
	get_eventResp,
	get_serviceResp,
	get_productResp} = require('../controller/userController')
const isAuth = require('../middleware/auth')

const router = new express.Router();


router.get('/signup', get_signup);
router.post('/signup', post_signup);
router.get('/login', get_login);
router.post('/login', post_login);
router.get('/profile', isAuth, get_profile)
router.get('/profile/:id', formResp)
router.get('/profile/eventresponse/:id', isAuth, get_eventResp)
router.get('/profile/serviceresponse/:id', isAuth, get_serviceResp)
router.get('/profile/productresponse/:id', isAuth, get_productResp)
// router.post('/api/change-password', changePassword);




module.exports = router;