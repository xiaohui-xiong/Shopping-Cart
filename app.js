const Koa = require('koa');
const compose = require('koa-compose');
const debug = require('debug')('koa-weapp')
const app = new Koa();
const queue = require('./middlewares')

debug('开始起动')
app.use(compose(queue))

// 引入路由分发
const router = require('./routes')
app.use(router.routes())
app.use(router.allowedMethods());

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`服务器已经运行`);
});