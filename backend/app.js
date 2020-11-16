const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const compression = require('compression');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');

const cakeRouter = require('./routes/cakeRoutes.js');
const userRouter = require('./routes/userRoutes.js');
const reviewRouter = require('./routes/reviewRoutes.js');
const uploadRouter = require('./routes/uploadRoutes.js');
const orderRouter = require('./routes/orderRoutes.js');
const AppError = require('./utils/appError.js');
const dbConfig = require('./utils/dbConfig.js');
const errorHandler = require('./controllers/errorController.js');
const { seralizeUser } = require('./controllers/authController.js');

const app = express();

dotenv.config();
dbConfig();
app.use(cors());
app.options('*', cors());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(seralizeUser);
// app.use((req, res, next) => {
// 	console.log(req.originalUrl);
// 	next();
// });

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}
app.use('/api/user', userRouter);
app.use('/api/cake', cakeRouter);
app.use('/api/review', reviewRouter);
app.use('/api/order', orderRouter);
app.use('/api/upload', uploadRouter);

app.all('*', (req, res, next) => {
	if (req.method === 'GET' && process.env.NODE_ENV === 'production') {
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
