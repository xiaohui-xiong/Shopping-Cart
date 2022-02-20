const debug = require('debug')('koa-weapp')

/**
 * 响应处理模块
 */
module.exports = async function (ctx, next) {
    try {
        // 调用下一个 middleware
        const start = new Date();
        await next()
        const ms = new Date() - start; //记录响应时间 
        ctx.set('X-Response-Time', ms + 'ms');
        ctx.set('X-s', ms + 'ly');
        // 处理响应结果
        // 如果直接写入在 body 中，则不作处理
        // 如果写在 ctx.body 为空，则使用 state 作为响应
        let {code,data,msg}  = ctx.body
        ctx.body = {
            code:code !==undefined ? code: 0,
            data:data !==undefined ? data : {},
            msg:msg !==undefined ? msg : "成功！！",
        }
    } catch (e) {
        // catch 住全局的错误信息
        debug('捕获错误: %o', e)

        // 设置状态码为 200 - 服务端错误
        ctx.status = 200

        // 输出详细的错误信息
        ctx.body = {
            code: -1,
            error: e && e.message ? e.message : e.toString()
        }
    }
}