const sequelize = require('../sequelize ')
const Sequelize = require('sequelize')
const moment = require('moment')

const admin = sequelize.define('admin', {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    unique: {
      msg: '已添加'
    }
  },
  email: {
    type: Sequelize.STRING(128)
  },
  password: {
    type: Sequelize.INTEGER(6)
  },

  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    get() {
      return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm')
    }
  },
  updated_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    get() {
      return moment(this.getDataValue('updated_at')).format('YYYY-MM-DD HH:mm')
    }
  }
}, {freezeTableName: true})

module.exports = admin