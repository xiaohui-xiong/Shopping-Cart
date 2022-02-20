const Router = require("koa-router");
const UserRouter = require('./user')
const router = new Router()

router.use(UserRouter.routes())

module.exports = router