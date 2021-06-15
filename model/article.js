const sequelize = require('../sequelize ')
const Sequelize = require('sequelize')
const moment = require('moment')

const article = sequelize.define('article', {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    allowNull: false,
    type: Sequelize.STRING(255),
    unique: {
      msg: '已添加'
    }
  },
  readedCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  author: Sequelize.STRING,
  summary: Sequelize.STRING,
  category_id: Sequelize.INTEGER,
  tag: Sequelize.STRING,
  cover: Sequelize.STRING,
  content: Sequelize.TEXT,
  description: Sequelize.TEXT,
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
},
{
  freezeTableName: true
})

module.exports = article