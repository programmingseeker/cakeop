import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';

import cakeRouter from './routes/cakeRoutes.js';
import userRouter from './routes/userRoutes.js';
import reviewRouter from './routes/reviewRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';
import AppError from './utils/appError.js';
import dbConfig from './utils/dbConfig.js';
import errorHandler from './controllers/errorController.js';
import { seralizeUser } from './controllers/authController.js';

const app = express();
const __dirname = path.resolve();

dotenv.config();
dbConfig();
app.use(cors());
app.options('*', cors());
app.use(helmet());
app.use(compression());
app.use(express.static(path.resolve(__dirname, 'backend', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(seralizeUser);

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}
console.log(__dirname);
app.use('/api/user', userRouter);
app.use('/api/cake', cakeRouter);
app.use('/api/review', reviewRouter);
app.use('/api/upload', uploadRouter);
app.all('*', (req, res, next) => {
	if (req.method === 'GET') {
		res.sendFile(path.join(__dirname, 'public', 'index.html'));
	}
	next(new AppError(`URL: "${req.originalUrl}" cannot be found`, 404));
});

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
	if (process.env.NODE_ENV === 'development') {
		console.log(
			'server has started on:  ' +
				`${process.env.NODE_ENV}`.yellow.bold +
				' mode'
		);
	} else {
		console.log(
			'server has started on:  ' +
				`${process.env.NODE_ENV}`.green.bold +
				' mode'
		);
	}
	console.log(`url: ` + `http://localhost:${port}`.yellow);
});
