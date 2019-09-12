const Router = require('koa-router');
const router = new Router();
const jwt = require('./jwt');
const routes = require('../routes');
const graphql = require('./koa-graphql');

router.get('/', routes.index);

router.all('/graphql', jwt, graphql);

router.post('/signup', routes.signUpPost);
router.get('/signup', routes.signUpGet);

router.post('/login', routes.loginPost);
router.get('/login', routes.loginGet);

router.get('/logout', routes.logout);

module.exports = router;
