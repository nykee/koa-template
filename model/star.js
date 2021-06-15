const sequelize = require('../sequelize ')
const Sequelize = require('sequelize')
const moment = require('moment')

const star = sequelize.define('star', {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  title: Sequelize.STRING,
  url: Sequelize.STRING,
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

module.exports = star