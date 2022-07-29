const createToken = require('./token-libs')
const expiresTime = require('../config').expiresTime

function getExpiresTime(num) { 
    let date1 = new Date()
    let date2 = new Date(date1)
    date2.setDate(date1.getDate() + num)
    // num是正数表示之后的时间，num负数表示之前的时间，0表示今天
    let time = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate()

    return time
}

async function validUser({ access, ctx }, callback) {
    if (!access) {
        ctx.body = {
            data: [],
            success: true,
            code: 401,
            msg: "请先登陆",
        }
	} else {
        await callback()
    }
}

function validParams(params, ctx) {
    let flag = true
    Object.keys(params).forEach(key => {
        if (!params[key]) {
            ctx.body = {
				data: [],
				success: false,
				code: 200,
				msg: `${key} can't be empty`,
			}
            flag = false
        }
    })
    return flag
}

function validAED(affectedRows, ctx, msg = '') {
    if (affectedRows > 0) {
        ctx.body = {
            data: [],
            success: true,
            code: 200,
            msg: msg ? `${msg}成功` : 'success',
        }
    } else {
        ctx.body = {
            data: [],
            success: false,
            code: 200,
            msg: msg ? `${msg}失败` : 'fail',
        }
    }
    return affectedRows > 0
}

function setCookies(params, ctx) {
    const { origin = '' } = ctx.request.header
    const domain = origin ? ctx.request.header.origin.split(':')[1].slice(2) : ''
    const { uid, password } = params
    const token = createToken({ uid, password })
    ctx.cookies.set('token', token, {
        domain,
        path: '/', // cookie写入的路径
        maxAge: 1000 * 60 * 60 * 1 * expiresTime,
        expires: new Date(getExpiresTime(14)),
        httpOnly: false,
        overwrite: true,
    })
    ctx.cookies.set('uid', uid, {
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
    validUser,
    validParams,
    validAED,
    setCookies,
}
