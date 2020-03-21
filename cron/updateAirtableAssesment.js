const { centerTable, airTableBase } = require('../constants')
const { getLatFromPostalCode } = require('../lib')

const updateAirtableAssesment = async (req, res, next) => {
  try {
    const record = await airTableBase(centerTable)
      .select({
        fields: ['PostalCode'],
        filterByFormula: '{lat}= BLANK()'
      })
      .all()

    if (record.length <= 0) res.send('All rows updated')
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
              airTableBase(centerTable).update(
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
  } catch (err) {
    console.error(err)
    res.sendStatus(404).send(err)
  }
}

module.exports = { updateAirtableAssesment }
