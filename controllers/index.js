const fs = require('fs')
const path = require('path')

const files = fs.readdirSync(__dirname).filter(file => file !== 'index.js')

const controllers = {}
for (const file of files) {
	const stat = fs.statSync(path.join(__dirname, file))
	if (stat.isDirectory()) {
		const secondFiles = fs.readdirSync(path.join(__dirname, file))
		for (const secondFile of secondFiles) {
			if (secondFile === 'index.js') {
				const controller = require(`./${file}/${secondFile}`)
				controllers[file] = {}
				Object.keys(controller).forEach(key => {
					controllers[file][key] = async (ctx, next) => {
						ctx.body = true // 匹配的路由添加body，防止404
						if (ctx.jwtData === null) { // jwt验证失败，不进入router
							next()
						} else { // jwt验证成功的 或 不需要token的接口
							await controller[key](ctx, next)
						}
					}
				})
			}
		}
	}
}

module.exports = controllers
