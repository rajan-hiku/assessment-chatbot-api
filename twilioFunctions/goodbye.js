const { getTextForFunction } = require('../lib/index')

exports.handler = async function (context, event, callback) {
  const message = await getTextForFunction('Goodbye')

  const responseObject = {
    actions: [
      {
        say: message
      }
    ]
  }
  callback(null, responseObject)
}

exports.handler = fn_callfallback
