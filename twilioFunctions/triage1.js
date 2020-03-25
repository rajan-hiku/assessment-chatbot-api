const { airTableBase, messagesTable } = require('../constants')

exports.handler = async (context, event, callback) => {
  let responseObject = {}
  let message = {}
  const memory = JSON.parse(event.Memory)

  const Breathing = memory.twilio.collected_data.ask_questions.answers.Breathing.answer

  if (Breathing === 'Yes') {
    // Evaluate-Answers
    airTableBase(messagesTable)
      .select({ filterByFormula: 'AND(SEARCH("Evaluate-Answers", Name),SEARCH("Both",BotType))' }).eachPage(function page (records, fetchNextPage) {
        message = records[0].fields.Message
        responseObject = {
          actions: [
            {
              say: message
            },
            {
              redirect: `${process.env.ASSESMENT_API}/getHospitalPostalCode`
            },
            {
              listen: true
            }
          ]
        }
        callback(null, responseObject)
      })
  } else {
    responseObject = {
      actions: [
        {
          redirect: `${process.env.ASSESMENT_API}/Questions2`
        },
        {
          listen: true
        }
      ]
    }
    callback(null, responseObject)
  }
}
