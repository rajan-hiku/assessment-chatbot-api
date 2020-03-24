const { airTableBase, messagesTable } = require('../constants')

exports.handler = function (context, event, callback) {
  airTableBase(messagesTable)
    .select({ filterByFormula: 'AND(SEARCH("Questions", Name),SEARCH("Both",BotType))' }).eachPage(function page (records, fetchNextPage) {
      const message = records[0].fields.Message
      const questions = [
        {
          question: {
            say: message

          },
          name: 'Breathing',
          type: 'Twilio.YES_NO'
        }
      ]
      const responseObject = {
        actions: [
          {
            collect: {
              name: 'ask_questions',
              questions: questions,
              on_complete: {
                redirect: 'https://assessment-center-api-4281-dev.twil.io/triage1'
              }
            }
          }]
      }
      callback(null, responseObject)
    })
}
