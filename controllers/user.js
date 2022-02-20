let { query } = require('../utils/mysql')
let { generateJwt } = require('../utils/jwt')
module.exports = {
    register: async ctx => {
        let { email, code, password } = ctx.request.body
        if (!email || email.trim() === '') {
            return ctx.body = {
                code: -1000,
                msg: "邮箱不能为空"
            }
        }
        // 是否已经注册过
        let querySql = `SELECT * FROM user WHERE email='${email}'`
        let value = await query(querySql)
        if (value.length > 0) {
            return ctx.body = {
                code: -1000,
                msg: "邮箱已经被注册了"
            }
        }
        // 插入到数据库
        let insertSql = `INSERT INTO user (email, password) VALUES ('${email}', '${password}')`
        value = await query(insertSql)
        return ctx.body = {
            code: 0,
            data:null,
            msg: "注册成功！！！"
        }
    },
    getCode: async ctx => {
        let { email } = ctx.request.query
        if (!email || email.trim() === '') {
            return ctx.body = {
                code: -1000,
                msg: "邮箱不能为空"
            }
        }
        // 是否已经注册过
        let querySql = `SELECT * FROM user WHERE email='${email}'`
        let value = await query(querySql)
        if (value.length > 0) {
            return ctx.body = {
                code: -1000,
                msg: "邮箱已经被注册了"
            }
        }
        let messageCode = Math.floor(Math.random() * 100000)
        return ctx.body = {
            code: 0,
            data: messageCode,
            msg: "验证码！"
        }
    },
    login: async ctx => {
        let { email, password } = ctx.request.body
        let querySql = `SELECT * FROM user WHERE email='${email}' and password='${password}'`
        value = await query(querySql)
        console.log(querySql)
        if (value.length === 0) {
            return ctx.body = {
                code: -1000,
                data:null,
                msg: "邮箱或密码错误~"
            }
        }
        
        ctx.body = {
            code: 0,
            data: generateJwt({ email, password }),
            msg: "登录成功"
        }
    }

}