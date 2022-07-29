const Router = require('koa-router')
const controllers = require('../../controllers')
const jwtMiddleware = require('../../middlewares/jwt')

const router = new Router()
router.use(jwtMiddleware) // 验证token

router.get('/user/info', controllers.user.info)

module.exports = router
