const AuthService = require('../services/AuthService');

const signUpPost = async (ctx, next) => {
  console.log('signup post');
  console.log(ctx.request.body);
  const user = await AuthService.signUp(ctx.request.body);
  ctx.body = user;
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

module.exports = {
  signUpPost,
  signUpGet,
};
