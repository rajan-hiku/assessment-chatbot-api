const dotenv = require('dotenv').config()

module.exports = {
  development: {
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASS,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql'
  }
}
