const jwt = require('jsonwebtoken')
const secret = require('../config').secret
const expiresTime = require('../config').expiresTime

const createToken = (userinfo) => {
    const { uid, password } = userinfo
    const token = jwt.sign({
        uid,
        password,
    }, secret, {
        expiresIn: `${expiresTime}h`
    })
    return token
}

module.exports = createToken
