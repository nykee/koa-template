'use strict'

const koaJwt = require('koa-jwt')
const jwt = require('jsonwebtoken')
const config = require('../config')
// const jwtMiddleware = koaJwt({ secret: config.secret })

module.exports = function (ctx, next) {
  // 将 token 中的数据解密后存到 ctx 中
    try {
      // console.log(typeof ctx.request.headers.authorization);
      if (typeof ctx.request.headers.authorization === 'string') {
        const token = ctx.request.headers.authorization.slice(7)
          console.log(token);
        console.log(jwt.verify(token, config.secret));
        ctx.jwtData = jwt.verify(token, config.secret)
      } else {
        ctx.throw({
          code: 401, message: 'no authorization'
        })
       /* throw {
          code: 401, message: 'no authorization'
        }*/

      }
    } catch (err) {
      ctx.throw({
        code: 401, message: 'no authorization'
      })
      /*throw {
        code: 401, message: 'no authorization'
      }*/
    }

  next()
}
