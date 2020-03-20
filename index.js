require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const Airtable = require('airtable')
var base = new Airtable({ apiKey: process.env.AIRTABLE }).base('appZv8bkFustjCUXN')
const opencage = require('opencage-api-client')
app.use(express.json()) // for parsing application/json
const airtableBase = 'CenterDetails'

app.get('/updateAirtable', async (req, res) => {
  try {
    const record = await base(airtableBase).select({
      fields: ['PostalCode']
    }).all()

    const airTableUpdatedRecords = []

    await Promise.all(record.map(async ({ id, fields }) => {
      const { PostalCode } = fields
      const resultLatLng = await getLatFromPostalCode(PostalCode)
      airTableUpdatedRecords.push({ id, fields: { ...resultLatLng } })
    }))

    const batchRequest = []
    const numberOfPromises = airTableUpdatedRecords.length % 10

    for (let i = 0; i < numberOfPromises; i++) {
      batchRequest.push(new Promise((resolve, reject) => {
        try {
          const start = i * 10
          const end = start + 10 > airTableUpdatedRecords.length ? airTableUpdatedRecords.length : start + 10
          resolve(base('CenterDetails').update(airTableUpdatedRecords.slice(start, end)))
        } catch (e) {
          reject(e)
        }
      }))
    }

    const results = await Promise.all(batchRequest)
    res.send(results)
  } catch (err) { console.error(err); res.sendStatus(404).send(err) }
})

app.get('/postalCode', async (req, res) => {
  const { postalCode } = req.body
  const userPostalCode = await getLatFromPostalCode(postalCode)
  res.send(userPostalCode)
})

const getLatFromPostalCode = async (postalCode) => {
  try {
    const { results } = await opencage.geocode({ q: postalCode })
    // geometry defaults to Toronto
    const { geometry } = (Array.isArray(results) && results.length > 0 && results[0]) || { 'lat': 43.6915, 'lng': -79.4307 }
    return geometry
  } catch (error) {
    return error
  }
}
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
