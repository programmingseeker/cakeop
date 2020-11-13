import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
		},
		email: {
			type: String,

			required: [true, 'Please enter an email'],
			unique: true,
			lowercase: true,
			validate: [validator.isEmail, 'Please enter a valid email'],
		},
		profileImage: {
			type: String,
			default: 'nouser.svg',
		},
		password: {
			type: String,
			minlength: [6, 'Minimum password length is 6 characters'],
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
		reviews: [],
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

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

//virtually connecting the user id

const User = mongoose.model('User', userSchema);
export default User;
