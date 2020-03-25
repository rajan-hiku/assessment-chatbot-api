const { airTableBase, messagesTable } = require('../constants')
exports.handler = function (context, event, callback) {
  airTableBase(messagesTable)
    .select({ filterByFormula: 'AND(SEARCH("getPostalCode", Name),SEARCH("Both",BotType))' }).eachPage(function page (records, fetchNextPage) {
      const message = records[0].fields.Message
      const questions = [
        {
          question: {
            say: message
          },
          name: 'PostalCode'
        }
      ]
      const responseObject = {
        actions: [
          {
            collect: {
              name: 'ask_questions',
              questions: questions,
              on_complete: {
                redirect: `${process.env.ASSESMENT_API}/nearestCent`
              }
            }
          }]
      }
      callback(null, responseObject)
    })
}
