const mongoose = require('mongoose');
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

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
