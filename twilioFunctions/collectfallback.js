const { getTextForFunction } = require('../lib/index')
const fn_callfallback = async function (context, event, callback) {
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
