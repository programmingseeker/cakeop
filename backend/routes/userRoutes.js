const express = require('express');
const router = express.Router();
const {
	postLogin,
	postSignUp,
	getLogout,
	isLoggedIn,
} = require('./../controllers/authController.js');
const { getMe, updateMe } = require('./../controllers/UserController.js');

router.route('/me').get(isLoggedIn, getMe).patch(isLoggedIn, updateMe);
router.post('/login', postLogin);
router.post('/signup', postSignUp);
router.get('/logout', isLoggedIn, getLogout);

module.exports = router;
