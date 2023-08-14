const createToken = require('./token-libs')
const config = require('../config')
const expiresTime = config.expiresTime

function getExpiresTime(num) { 
    let date1 = new Date()
    let date2 = new Date(date1)
    date2.setDate(date1.getDate() + num)
    // num是正数表示之后的时间，num负数表示之前的时间，0表示今天
    let time = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate()

    return time
}

function verify(params, ctx = {}, next) {
    let success = true
    const message = []
    Object.keys(params).forEach(key => {
        if (!params[key] && params[key] !== 0) {
            success = false
            message.push(`${key} doesn't exist`)
        }
    })

    ctx.success = success
    ctx.message = message.join(',')

    if (!success && next) next()

    return success
}

function setCookies(params, ctx) {
    const { origin = '' } = ctx.request.header
    const domain = origin ? ctx.request.header.origin.split(':')[1].slice(2) : ''
    const { uid, password } = params
    const token = createToken({ uid, password })
    ctx.cookies.set(`${config.cookiesPref}-token`, token, {
        domain,
        path: '/', // cookie写入的路径
        maxAge: 1000 * 60 * 60 * 1 * expiresTime,
        expires: new Date(getExpiresTime(14)),
        httpOnly: false,
        overwrite: true,
    })
    ctx.cookies.set(`${config.cookiesPref}-uid`, uid, {
        domain,
        path: '/', // cookie写入的路径
        maxAge: 1000 * 60 * 60 * 1 * expiresTime,
        expires: new Date(getExpiresTime(14)),
        httpOnly: false,
        overwrite: true,
    })
}

module.exports = {
    getExpiresTime,
    setCookies,
    verify,
}
