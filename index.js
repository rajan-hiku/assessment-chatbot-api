require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const Airtable = require('airtable')
var base = new Airtable({ apiKey: process.env.AIRTABLE }).base('appZv8bkFustjCUXN')
const opencage = require('opencage-api-client')
app.use(express.json()) // for parsing application/json

app.get('/', async (req, res) => {
  try {
    const record = await base('CenterDetails').find('recspsA9yRI1k3e5F')
    const { fields } = record
    const { PostalCode } = fields
    const postalCode = await getLatFromPostalCode(PostalCode)
    res.send(postalCode)
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
    return JSON.stringify(geometry)
  } catch (error) {
    return error
  }
}
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
