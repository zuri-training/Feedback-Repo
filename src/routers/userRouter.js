const express = require('express')
const {
    get_signup,
	post_signup,
	get_login,
	post_login} = require('../controller/userController')

const router = new express.Router();


router.get('/signup', get_signup);
router.post('/signup', post_signup);
router.get('/login', get_login);
router.post('/login', post_login);
// router.post('/api/change-password', changePassword);




module.exports = router;