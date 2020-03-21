const { hospitalTable } = require('../constants')
const { getLatFromPostalCode, airTableBase } = require('../lib')

const updateAirtableHospital = async (req, res, next) => {
  try {
    const { headers } = req
    if (headers.password === process.env.CRON_PASS) {
      const record = await airTableBase(hospitalTable)
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
                airTableBase(hospitalTable).update(
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
}

module.exports = { updateAirtableHospital }
