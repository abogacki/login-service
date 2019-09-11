const { getUserId } = require('../../utils/utils');
const { User } = require('../../models/User');
const { Gadget } = require('../../models/Gadget');
const { UserGadget } = require('../../models/UserGadget');
const AuthService = require('../../services/AuthService');

const signUp = async (root, args, context, info) => {
	try {
		const { name, email, password } = args;
		const credentials = AuthService.signUp({ name, email, password });
		return credentials;
	} catch (error) {
		throw error;
	}
};

const login = async (root, args, context, info) => {
	try {
		const { email, password } = args;

		const credentials = await AuthService.login({ email, password });
		return credentials;
	} catch (error) {
		throw error;
	}
};

const gadgetCreate = async (root, args, context, info) => {
	const gadget = new Gadget({
		name: args.name, // explcitly
		by_company: args.by_company, // explcitly
		price: args.price, // explcitly
		release_date: args.release_date,
	});

	await gadget.save();

	const { id } = getUserId(context);
	const user = await User.findById(id);

	const newGadgetUserPair = new UserGadget({
		gadget,
		user,
	});

	await newGadgetUserPair.save();
	return newGadgetUserPair;
};

const gadgetBuy = async (root, args, context) => {
	const { id } = getUserId(context);
	const { gadgetId } = args;
	const user = await User.findById(id);
	const gadget = await Gadget.findById(gadgetId);

	const newPair = new UserGadget({
		user,
		gadget,
	});

	await newPair.save();

	return UserGadget.find({ user })
		.populate('gadget')
		.populate('user')
		.exec();
};

module.exports = {
	signUp,
	login,
	gadgetCreate,
	gadgetBuy,
};
