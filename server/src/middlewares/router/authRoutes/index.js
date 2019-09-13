const facebook = require('./facebook');
const local = require('./local');
const Router = require('koa-router');

const router = new Router();

router.use('/facebook', facebook.routes(), facebook.allowedMethods());
router.use('/local', local.routes(), local.allowedMethods());

module.exports = router;
