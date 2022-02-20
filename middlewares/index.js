const koaBody = require('koa-body');
const path = require('path');
const koaStatic = require('koa-static')
const response = require('./response')
const cors = require('koa2-cors')

const queue = []

//按照处理顺序进行push 也是按照这种顺序执行的
queue.push(koaStatic(path.join(__dirname, '../public')))
queue.push(cors())
queue.push(response) // 使用响应处理中间件

queue.push(koaBody({
    jsonLimit: '1kb'
})) //body

module.exports = queue