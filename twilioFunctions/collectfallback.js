// const { airTableBase, messagesTable } = require('../constants')
const { getTextForFunction } = require('../lib/index')
const fn_callfallback = async function (context, event, callback) {
  // airTableBase(messagesTable)
  // .select({ filterByFormula: 'AND(SEARCH("Collect_Fallback", Name),SEARCH("Both",BotType))' })
  // .eachPage(function page (records, fetchNextPage) {
  // This function (`page`) will get called for each page of records.
  // console.log(records[0].fields)

  const message = await getTextForFunction('Collect_Fallback', 'Both', 'English')
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
  // }, function done (err) {
  // if (err) { console.error(err) }
  // })
}

exports.handler = fn_callfallback
