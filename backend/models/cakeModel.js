import mongoose from 'mongoose';

const cakeSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Name is required'],
			unique: true,
		},
		slug: String,
		weight: {
			type: Number,
			required: [true, 'Weight is required'],
		},
		theme: {
			type: String,
		},
		price: {
			type: Number,
			required: [true, 'Price is required'],
		},
		description: {
			type: String,
			required: [true, 'A Cake must have a description'],
		},
		ratingsQuantity: {
			type: Number,
			default: 0,
		},
		ratingsAverage: {
			type: Number,
			default: 0,
		},
		images: [String],
		// reviews: [{
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: 'Review'
		// }],
		createdAt: {
			type: Date,
			default: Date.now(),
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
);

//virtually connecting the cake id
cakeSchema.virtual('reviews', {
	ref: 'Review',
	foreignField: 'cake',
	localField: '_id'
});

//Populating the reviews
cakeSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'reviews',
		select: '-__v'
	});
	next();
});

const Cake = mongoose.model('Cake', cakeSchema);
export default Cake;
