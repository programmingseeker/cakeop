import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
		userName: {
			type: String,
		},
		cake: {
			type: mongoose.Types.ObjectId,
			ref: 'Cake',
		},
		review: {
			type: String,
		},
		ratings: {
			type: Number,
			min: 1,
			max: 5,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// reviewSchema.pre(/^find/, function (next) {
// 	this.populate({
// 		path: 'user',
// 		select:'username'
// 	}).populate({
// 		path: 'cake',
// 		select:'name'
// 	})
// 	next();
// });

const Review = mongoose.model('Review', reviewSchema);
export default Review;
