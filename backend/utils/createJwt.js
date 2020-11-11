import dotenv from 'dotenv';
dotenv.config();
export default function (jwt, id, user) {
	return jwt.sign({ uid: id, role: user }, process.env.JWTSECRET, {
		expiresIn: process.env.JWTEXPIRES,
	});
}
