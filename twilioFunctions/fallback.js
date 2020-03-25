const { airTableBase, messagesTable } = require('../constants')

const fn_callfallback = function (context, event, callback) {
  let message = ''
  airTableBase(messagesTable)
    .select({ filterByFormula: 'AND(SEARCH("Fallback", Name),SEARCH("Both",BotType))' })
    .eachPage(function page (records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.
      console.log(records[0].fields)
      message = records[0].fields.Message
      const responseObject = {
        actions: [
          {
            say: message
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
    }, function done (err) {
      if (err) { console.error(err) }
    })
}

exports.handler = fn_callfallback
