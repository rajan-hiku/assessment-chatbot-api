const { getTop3Centers, defaultHospitalCodeTxt, getTextForFunction } = require('../lib')
const { hospitalTable } = require('../constants')

const nearestCenter = async (context, event, callback) => {
  let responseObject = {}
  const memory = JSON.parse(event.Memory)
  const postalCode =
    memory.twilio.collected_data.ask_questions.answers.HPostalCode.answer
    // getHospitalPostalCode
  const top3 = await getTop3Centers(hospitalTable, postalCode)
  const startTxt = await getTextForFunction('getHospitalPostalCode')

  const result = await defaultHospitalCodeTxt(
    startTxt,
    top3
  )

  responseObject = {
    actions: [
      {
        say: result
      },
      {
        redirect: `${process.env.ASSESMENT_API}/informationRoute`
      },
      {
        listen: false
      }
    ]
  }
  callback(null, responseObject)
}

exports.handler = nearestCenter
