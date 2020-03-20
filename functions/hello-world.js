const { getTop3Centers, defaultPostalCodeTxt } = require('./lib')

const nearestCenter = async (context, event, callback) => {
  const twiml = new Twilio.twiml.VoiceResponse()
  const { postalCode } = context
  const top3 = await getTop3Centers(postalCode)
  const result = defaultPostalCodeTxt(top3)
  twiml.say(result);
  callback(null, twiml)
};

exports.handler = nearestCenter
