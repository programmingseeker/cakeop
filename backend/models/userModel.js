import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
	username: {
		type: String,
	},
	email: {
		type: String,
	},
	profileImage: {
		type: String,
		default: '/img/nouser.svg',
	},
	password: {
		type: String,
		minlength: 6,
	},
	googleId: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	userType: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user',
	},
	cakesBrought: [
		{
			cake: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Cake',
			},
			isReviewed: {
				type: Boolean,
				default: false,
			},
		},
	],
});

userSchema.pre('save', async function (next) {
	if (this.password) {
		const salt = await bcrypt.genSalt(11);
		this.password = await bcrypt.hash(this.password, salt);
	}
	next();
});

userSchema.methods.checkPassword = function (password) {
	return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
