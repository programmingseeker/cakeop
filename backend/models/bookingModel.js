import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
	},
	cakes: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Cake',
		},
	],
	price: {
		type: Number,
		required: [true, 'Price is required'],
	},
	paid: Boolean,
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});
const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
