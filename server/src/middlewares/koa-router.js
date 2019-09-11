const Router = require('koa-router');
const router = new Router();
const jwt = require('../middlewares/jwt');
const routes = require('../routes');
const graphql = require('../middlewares/koa-graphql');

router.all('/graphql', jwt, graphql);
router.get('/', routes.index);
router.post('/signup', routes.signUpPost);
router.get('/signup', routes.signUpGet);
router.post('/login', routes.loginPost);
router.get('/login', routes.loginGet);
router.get('/logout', routes.logout);
module.exports = router;
