const { User } = require('../models/User');
const bcrpyt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {
	static signUp() {
		//  sign up implementation
	}
	static login() {
		//  login implementation
	}
}

module.exports = class extends AuthService {
	static async signUp({ email, password, name }) {
		try {
			const hash = await bcrpyt.hash(password, 10);
			const user = new User({
				name,
				email,
				password: hash,
			});
			await user.save();
			const token = jwt.sign({ id: user._id }, process.env.API_KEY);
			return {
				token,
				user,
			};
		} catch (error) {
			throw error;
		}
	}

	static async login({ email, password }) {
		const user = await User.findOne({ email });
		if (!user) throw new Error('Incorrect credentials');

		const isValid = await bcrpyt.compare(password, user.password);
		if (!isValid) throw new Error('Incorrect credentials');

		const token = jwt.sign({ id: user._id }, process.env.API_KEY);

		return {
			token,
			user,
		};
	}
};
