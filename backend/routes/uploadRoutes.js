import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const __dirname = path.resolve();
const publicImg = path.join(__dirname, 'backend/public/img');
const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, publicImg);
	},
	filename(req, file, cb) {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		);
	},
});

function checkFileType(file, cb) {
	const filetypes = /jpg|jpeg|png/;
	const extname = filetypes.test(
		path.extname(file.originalname).toLowerCase()
	);
	const mimetype = filetypes.test(file.mimetype);

	if (extname && mimetype) {
		return cb(null, true);
	} else {
		cb('Images only!');
	}
}

const upload = multer({
	storage,
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	},
});

router.post('/', upload.any('images', 5), (req, res) => {
	const data = req.files.map((file) => file.filename);
	res.json({ images: data });
});

export default router;
