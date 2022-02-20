const Router = require("koa-router");
const controllers = require('../controllers')
const router = new Router({prefix: '/api/user'})
  .post('/register', controllers.user.register)
  .get('/getCode', controllers.user.getCode)
  .post('/login', controllers.user.login)

module.exports = router