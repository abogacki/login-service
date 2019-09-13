const Router = require('koa-router');
const AuthService = require('../../services/AuthService');

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

const router = new Router();

router.get('/', signUpGet);
router.post('/', signUpPost);

module.exports = router;
