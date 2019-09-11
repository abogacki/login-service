const AuthService = require('../services/AuthService');

const signUpPost = async (ctx, next) => {
	const credentials = await AuthService.signUp(ctx.request.body);
	await ctx.login(credentials.user);
	ctx.redirect('/');
};

const signUpGet = async (ctx, next) => {
	ctx.type = 'html';
	ctx.body = `
  <form action="/signup" method="post">
    <label for="name">name</label>
    <input name="name" id="name" type="text" value="xD" required />
    <label for="password">password</label>
    <input name="password" id="password" value="password" type="password" required />
    <label for="email">email</label>
    <input name="email" id="email" type="email" value="xd@xd.com" required />
  <input type="submit" />
</form>
`;
};

const loginPost = async (ctx, next) => {
	const credentials = await AuthService.login(ctx.request.body);
	await ctx.login(credentials.user);
	ctx.body = {
		isAuth: ctx.isAuthenticated(),
		user: ctx.state.user,
	};
	next();
};

const loginGet = async (ctx, next) => {
	ctx.type = 'html';
	ctx.body = `
  <form action="/login" method="post">
  <label for="email">email</label>
  <input name="email" id="email" type="email" value="a@a.com" required />
    <label for="password">password</label>
    <input name="password" id="password" value="admin" type="password" required />
  <input type="submit" />
</form>
`;
};

const logout = async (ctx, next) => {
	await ctx.logout();
	ctx.redirect('/');
};
const index = async ctx => {
	// ctx.body = JSON.stringify(ctx.state.user);
	console.log(ctx.state.user.name);
};
module.exports = {
	signUpPost,
	signUpGet,
	index,
	loginGet,
	loginPost,
	logout,
};
