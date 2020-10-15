import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

// const GoogleStrategy = require('passport-google-oauth20').Strategy;
import User from './../models/userModel.js';

export default (passport) => {
	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_SECRET,
				callbackURL: 'http://localhost:5000/user/login/google/redirect',
			},
			async (accessToken, refreshToken, profile, done) => {
				const user = await User.findOne({ googleId: profile.id });
				if (!user) {
					const newUser = await User.create({
						username: profile.displayName,
						googleId: profile.id,
						email: profile.emails[0].value,
					});
					return done(null, newUser);
				}
				done(null, user);
			}
		)
	);
};
