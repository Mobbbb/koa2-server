const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const json = require('koa-json')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const onerror = require('koa-onerror')

const privateRouter = require('./routes/private')
const publicRouter = require('./routes/public')
const corsHandler = require('./middlewares/cors')
const { errorHandler, responseHandler } = require('./middlewares/response')

const app = new Koa()

// error handler
onerror(app)

// Error Handler
app.use(errorHandler)

app.use(bodyparser({ enableTypes:['json', 'form', 'text'] }))
app.use(json())
app.use(logger())
app.use(cors(corsHandler))

// routes
app.use(privateRouter.routes(), privateRouter.allowedMethods())
app.use(publicRouter.routes(), publicRouter.allowedMethods())

// Response
app.use(responseHandler)

// error-handling
app.on('error', (err, ctx) => {
  	console.error('server error', err, ctx)
})

module.exports = app
