'use strict'

const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = function(ctx, next) {
    // 将 token 中的数据解密后存到 ctx 中
    let token = ctx.cookies.get(`${config.cookiesPref}-token`)
    if (token){
        jwt.verify(token, config.secret, (error, decoded) => {
            if (error) {
                ctx.jwtData = null
                ctx.code = 403
                ctx.success = false
                ctx.msg = error.message
            } else {
                ctx.jwtData = decoded
            }
        })
    } else {
        ctx.jwtData = null
        ctx.success = false
        ctx.msg = 'token does not exist'
    }
    return next()
}
