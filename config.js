'use strict'

const path = require('path')

module.exports = {
  port: '3001',
  secret: 'shared-secret',
  publicDir: path.resolve(__dirname, './public'),
  logPath: path.resolve(__dirname, './logs/koa-template.log'),
  mysql:{
    database: 'mall',
    username: 'root',
    password: 'root',
    host: '127.0.0.1',
    port: 3306
  }
};
