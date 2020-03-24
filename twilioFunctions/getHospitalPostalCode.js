const { airTableBase, messagesTable } = require('../constants')
exports.handler = function (context, event, callback) {
  airTableBase(messagesTable)
    .select({ filterByFormula: 'AND(SEARCH("getHospitalPostalCode", Name),SEARCH("Both",BotType))' }).eachPage(function page (records, fetchNextPage) {
      const message = records[0].fields.Message
      const questions = [
        {
          question: {
            say: message
          },
          name: 'HPostalCode'
        }
      ]
      const responseObject = {
        actions: [
          {
            collect: {
              name: 'ask_questions',
              questions: questions,
              on_complete: {
                redirect: 'https://assessment-center-api-4281-dev.twil.io/nearestHosp'
              }
            }
          }]
      }
      callback(null, responseObject)
    })
}
