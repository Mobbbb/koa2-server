/**
 * @param {String} ctx.msg
 * @param {String} ctx.success
 * @param {Object} ctx.result
 * @param {Object} ctx.jwtData
 */

const { setCookies } = require('../../utils/libs')
const userServices = require('../../services').user
const userControllers = {}

/**
 * @description 登录
 */
userControllers.login = async (ctx, next) => {
	const params =  ctx.request.body
	const { uid = '', password = '' } = params
	if (!uid.toString() || !password.toString()) {
		ctx.msg = '账号密码不得为空!'
		ctx.success = false
	} else {
		const user = await userServices.login({ uid, password })
		if (!user.length) {
			ctx.msg = '账号或密码错误!'
			ctx.success = false
		} else {
			const { password: sqlPassword } = user[0] || {}
			if (sqlPassword === password) {
				setCookies({ uid, password }, ctx)
				ctx.msg = '登陆成功'
			} else {
				ctx.msg = '账号或密码错误!'
				ctx.success = false
			}
		}
	}

	next()
}

/**
 * @description 获取登录的用户信息
 */
userControllers.info = (ctx, next) => {
	ctx.result = ctx.jwtData
	delete ctx.result.password
	next()
}

module.exports = userControllers
