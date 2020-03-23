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

router.post('/nearestCenter', async (req, res) => {
  const postalCode = req.body.postalCode
  // Pushing into Twilio format
  const mem = JSON.stringify({
    twilio: {
      collected_data: {
        ask_questions: {
          answers: {
            PostalCode: {
              answer: postalCode
            }
          }
        }
      }
    }
  })

  const event = {
    Memory: mem
  }
  const callback = (err, respond) => {
    if (err) res.send(err)
    res.send(respond)
  }
  const { handler } = require('./twilioFunctions/nearestCenter')
  handler(null, event, callback)
})

router.post('/nearestHospital', async (req, res) => {
  const postalCode = req.body.postalCode
  // Pushing into Twilio format
  const mem = JSON.stringify({
    twilio: {
      collected_data: {
        ask_questions: {
          answers: {
            HPostalCode: {
              answer: postalCode
            }
          }
        }
      }
    }
  })

  const event = {
    Memory: mem
  }
  const callback = (err, respond) => {
    if (err) res.send(err)
    res.send(respond)
  }
  const { handler } = require('./twilioFunctions/nearestHospital')
  handler(null, event, callback)
})

router.get('/infoRoute', async (req, res) => {
  const event = {
  }
  const callback = (err, respond) => {
    if (err) res.send(err)
    res.send(respond)
  }
  const { handler } = require('./twilioFunctions/informationRoute')
  handler(null, event, callback)
})

app.use('/', router)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
