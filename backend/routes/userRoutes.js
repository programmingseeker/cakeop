import express from 'express';
const router = express.Router();
import {
	postLogin,
	postSignUp,
	getLogout,
	isLoggedIn,
} from './../controllers/authController.js';
import { getMe, updateMe } from './../controllers/UserController.js';

router.route('/me').get(isLoggedIn, getMe).patch(isLoggedIn, updateMe);
router.post('/login', postLogin);
router.post('/signup', postSignUp);
router.get('/logout', isLoggedIn, getLogout);

export default router;
