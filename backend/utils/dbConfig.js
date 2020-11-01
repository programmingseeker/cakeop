import mongoose from 'mongoose';
export default async () => {
	try {
		const connection = await mongoose.connect(process.env.mongoURI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
		});
		console.log(
			`MongoDB Connected: ${connection.connection.host}`.cyan.bold
		);
	} catch (error) {
		console.error(`Error: ${error}`.red.underline.bold);
		process.exit(1);
	}
};
