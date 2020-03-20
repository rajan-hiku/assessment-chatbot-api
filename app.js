require('dotenv').config()
const express = require('express')
const app = express()
const Airtable = require('airtable')
const cors = require('cors')
var base = new Airtable({ apiKey: process.env.AIRTABLE }).base(
  'appZv8bkFustjCUXN'
)
const bodyParser = require('body-parser')
const router = express.Router()
const airtableBase = 'CenterDetails'
const { getLatFromPostalCode } = require('./functions/lib')
app.use(express.json()) // for parsing application/json
router.use(cors())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/updateAirtable', async (req, res) => {
  try {
    const { headers } = req
    if (headers.password === process.env.CRON_PASS) {
      const record = await base(airtableBase)
        .select({
          fields: ['PostalCode']
        })
        .all()

      const airTableUpdatedRecords = []

      await Promise.all(
        record.map(async ({ id, fields }) => {
          const { PostalCode } = fields
          const resultLatLng = await getLatFromPostalCode(PostalCode)
          airTableUpdatedRecords.push({ id, fields: { ...resultLatLng } })
        })
      )

      const batchRequest = []
      const numberOfPromises = airTableUpdatedRecords.length % 10

      for (let i = 0; i < numberOfPromises; i++) {
        batchRequest.push(
          new Promise((resolve, reject) => {
            try {
              const start = i * 10
              const end =
                start + 10 > airTableUpdatedRecords.length
                  ? airTableUpdatedRecords.length
                  : start + 10
              resolve(
                base('CenterDetails').update(
                  airTableUpdatedRecords.slice(start, end)
                )
              )
            } catch (e) {
              reject(e)
            }
          })
        )
      }

      const results = await Promise.all(batchRequest)
      res.send(results)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    console.error(err)
    res.sendStatus(404).send(err)
  }
})

app.use('/', router)

module.exports = app
// app.listen(port, () => console.log(`Example app listening on port ${port}!`));
