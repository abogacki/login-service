const Router = require('koa-router');
const router = new Router();
const routes = require('./routes');
const graphql = require('../graphql');
const privateResourceMiddleware = require('../privateResourceMiddleware');

router.get('/', privateResourceMiddleware, routes.index);

router.all('/graphql', graphql);

router.post('/signup', routes.signUpPost);
router.get('/signup', routes.signUpGet);

router.post('/login', routes.loginPost);
router.get('/login', routes.loginGet);

router.get('/logout', routes.logout);

router.use('/auth', routes.auth.routes(), routes.auth.allowedMethods());

module.exports = router;
