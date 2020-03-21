const hospitalTable = 'HospitalDetails'
const centerTable = 'CenterDetails'
const Airtable = require('airtable')
const airTableBase = new Airtable({ apiKey: process.env.AIRTABLE }).base(
  'appZv8bkFustjCUXN'
)

module.exports = {
  airTableBase,
  centerTable,
  hospitalTable
}
