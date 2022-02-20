const jsonwebtoken = require('jsonwebtoken');

const SECRET = 'ly6666'; //随意输入

const generateJwt = (user) => {
    const token = jsonwebtoken.sign(
        { name: user.email },  // 加密userToken
        SECRET,
        { expiresIn: '1h' }
    )
    return token
}


const decodeJwt = (token) => {
    return jsonwebtoken.decode(token)
}

module.exports = {
    generateJwt,
    decodeJwt,
    SECRET
}