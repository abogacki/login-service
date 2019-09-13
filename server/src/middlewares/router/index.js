const Router = require('koa-router');
const router = new Router();
const routes = require('./rootRoutes');
const graphql = require('../graphql');
const privateResourceMiddleware = require('../privateResourceMiddleware');

router.get('/', privateResourceMiddleware, routes.index);
router.all('/graphql', graphql);
router.use('/auth', routes.auth.routes(), routes.auth.allowedMethods());
router.use('/login', routes.login.routes(), router.login.allowedMethods());
router.use('/signup', router.signUp.routes(), routes.signUp.allowedMethods());

module.exports = router;
