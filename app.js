const Koa = require('koa')
const app = new Koa()
// const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwtKoa = require('koa-jwt')
const config = require("./config");

const { loggerMiddleware } = require('./middlewares/logger')

const index = require('./routes/index')
const users = require('./routes/users')
require('./sequelize ')


// error handler
onerror(app)

// middlewares
//去除不需要通过jwt验证的接口地址
/*app.use(
    jwtKoa({secret:config.secret}).unless({
        path:['/login',"logout"]
    })
)*/

app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
// Logger
app.use(loggerMiddleware)
// app.use(require('koa-static')(__dirname + '/public'))

/*app.use(views(__dirname + '/views', {
  extension: 'pug'
}))*/



// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`) 
})
// const example = require('./routes/example')
// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
// app.use(example.routes(), example.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error：', err, ctx)
});

module.exports = app
