const hospitalTable = 'HospitalDetails'
const centerTable = 'CenterDetails'
const messagesTable = 'TwilioMessages'
const Airtable = require('airtable')
const Sequelize = require('sequelize')
const path = require('path')

const db = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USERNAME, process.env.MYSQL_PASS, {
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASS,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  dialect: 'mysql'
})

const airTableBase = new Airtable({ apiKey: process.env.AIRTABLE }).base(
  'appZv8bkFustjCUXN'
)
const centerTableDB = db.import(path.resolve(__dirname, './models/centerdetails'))
const hospitalTableDB = db.import(path.resolve(__dirname, './models/hospitaldetails'))

const messageTableDB = db.import(path.resolve(__dirname, './models/twiliomessages'))
module.exports = {
  airTableBase,
  centerTable,
  hospitalTable,
  db,
  messagesTable,
  messageTableDB,
  centerTableDB,
  hospitalTableDB
}
