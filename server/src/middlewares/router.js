const Router = require('koa-router');
const router = new Router();
const routes = require('../routes');
const graphql = require('./koa-graphql');
const privateResourceMiddleware = require('../middlewares/privateResourceMiddleware');

router.get('/', privateResourceMiddleware, routes.index);

router.all('/graphql', privateResourceMiddleware, graphql);

router.post('/signup', routes.signUpPost);
router.get('/signup', routes.signUpGet);

router.post('/login', routes.loginPost);
router.get('/login', routes.loginGet);

router.get('/logout', routes.logout);

module.exports = router;
