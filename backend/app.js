import express from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import cors from 'cors';
import { config } from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import path from 'path';

import cakeRouter from './routes/cakeRoutes.js';
import userRouter from './routes/userRoutes.js';
import reviewRouter from './routes/reviewRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';
import AppError from './utils/appError.js';
import globalErrorController from './controllers/errorController.js';
import passportConfig from './utils/passportConfig.js';
import dbConfig from './utils/dbConfig.js';
import { seralizeUser } from './controllers/authController.js';

const app = express();
const __dirname = path.resolve();

config();
dbConfig();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
passportConfig(passport);
app.use(passport.initialize());
app.use(seralizeUser);
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use('/api/user', userRouter);
app.use('/api/cake', cakeRouter);
app.use('/api/review', reviewRouter);
app.use('/api/upload', uploadRouter);
app.use('*', (req, res, next) => {
	next(
		new AppError(
			`This url ${req.originalUrl} on this server is not present`,
			this.statusCode
		)
	);
});
app.use(globalErrorController);

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
