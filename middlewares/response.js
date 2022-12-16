'use strict'

const failCode = [404]

/**
 * @param {*} status 200、500、403...
 * @param {*} code 
 * @param {*} msg 
 * @param {*} result 
 * @param {*} success 
 * @param {*} verify 字段校验
 * @param {*} updateResult 增删改结果返回
 */
// 这个middleware用于将ctx.result中的内容最终回传给客户端
const responseHandler = async (ctx) => {
    if (ctx.verify) { // 字段校验
        const msgList = []
        Object.keys(ctx.verify).forEach(key => {
            if (!ctx.verify[key] && ctx.verify[key] !== 0) {
                ctx.success = false
                msgList.push(`${key} doesn't exist`)
            }
        })
        if (msgList.length) {
            ctx.message = msgList.join(',')
        }
    }
    
    if (ctx.updateResult) { // 增删改结果返回
		const { affectedRows, message } = ctx.updateResult
		if (!affectedRows) {
			ctx.success = false
			ctx.msg = message
		}
    }

    const status = ctx.status
    const code = ctx.code || status
    ctx.body = {
        code,
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
