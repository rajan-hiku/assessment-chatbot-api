const { getTop3Centers, defaultAssementCodeTxt } = require('../lib')
const { centerTable } = require('../constants')

const nearestCenter = async (context, event, callback) => {
  let responseObject = {}
  const memory = JSON.parse(event.Memory)
  const postalCode =
    memory.twilio.collected_data.ask_questions.answers.PostalCode.answer

  const top3 = await getTop3Centers(centerTable, postalCode)
  const result = defaultAssementCodeTxt(
    'The 3 closest assessment center to you are:',
    top3
  )
  responseObject = {
    actions: [
      {
        say: result
      },
      {
        redirect: 'https://assessment-center-api-4281-dev.twil.io/informationRoute'
      },
      {
        listen: false
      }
    ]
  }
  callback(null, responseObject)
}

exports.handler = nearestCenter
