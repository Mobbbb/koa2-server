'use strict'

const failCode = [404]

// 这个middleware用于将ctx.result中的内容最终回传给客户端
const responseHandler = async (ctx) => {
    let status = ctx.status
    // ctx.body status将会返回404
    if (ctx.body) status = 200
    ctx.body = {
        code: status,
        msg: ctx.msg || ctx.message || '',
        data: ctx.result || [],
        success: typeof ctx.success !== 'undefined' ? ctx.success : !failCode.includes(status),
    }
}

// 这个middleware处理在其它middleware中出现的异常,我们在next()后面进行异常捕获，出现异常直接进入这个中间件进行处理
const errorHandler = (ctx, next) => {
    return next().catch(err => {
        ctx.body = {
            code: err.code || -1,
            data: null,
            msg: err.message.trim(),
            success: false,
        }
        // 保证返回状态是 200
        ctx.status = 200
        return Promise.resolve()
    })
}

module.exports = {
    responseHandler,
    errorHandler,
}
