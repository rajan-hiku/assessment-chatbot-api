const { getTextForFunction } = require('../lib/index')

exports.handler = async function (context, event, callback) {
  const message = await getTextForFunction('Questions3')

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
            redirect: `${process.env.ASSESMENT_API}/triage3`
          }
        }
      }]
  }
  callback(null, responseObject)
}
