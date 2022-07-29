const Router = require('koa-router')
const controllers = require('../../controllers')

const router = new Router()

router.post('/user/login', controllers.user.login)

module.exports = router
