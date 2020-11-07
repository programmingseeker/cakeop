import express from 'express';
const router = express.Router();
import {
	postLogin,
	postSignUp,
	getLogout,
	isLoggedIn,
} from './../controllers/authController.js';
import { getMe } from './../controllers/UserController.js';

router.get('/me', isLoggedIn, getMe);
router.post('/login', postLogin);
router.post('/signup', postSignUp);
router.get('/logout', isLoggedIn, getLogout);

export default router;
