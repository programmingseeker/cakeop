import path from 'path';
import express from 'express';
import uploadImage from './../utils/uploadImage.js';
import { restrictTo } from './../controllers/authController.js';
import { updateMe } from './../controllers/UserController.js';

const router = express.Router();

const __dirname = path.resolve();
const publicImg = path.join(__dirname, 'backend/public/img');
const publicUserImg = path.join(__dirname, 'backend/public/user');
const cakeImageUpload = uploadImage(publicImg);
const userImageUpload = uploadImage(publicUserImg);

router.post(
	'/',
	restrictTo('admin'),
	cakeImageUpload.any('images', 5),
	(req, res) => {
		const data = [];
		req.files.map((file) => data.push(file.filename.toString()));
		res.json({ images: data });
	}
);

router.post(
	'/user',
	restrictTo('user'),
	userImageUpload.single('profileImage', 1),
	updateMe
);

export default router;
