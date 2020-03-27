require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

const bodyParser = require('body-parser')

const router = express.Router()

app.use(express.json()) // for parsing application/json
router.use(cors())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

const { updateAirtableAssesment } = require('./cron/updateAirtableAssesment')
const { updateAirtableHospital } = require('./cron/updateAirtableHospital')

function cronCheck (req, res, next) {
  const { headers } = req
  if (headers.password === process.env.CRON_PASS) {
    next()
  } else {
    res.sendStatus(401)
  }
}
router.get('/updateAirtableAssesment', cronCheck, updateAirtableAssesment)
router.get('/updateAirtableHospital', cronCheck, updateAirtableHospital)
require('./chatBot')(router)

app.use('/', router)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
