const { getTop3Centers, defaultAssementCodeTxt } = require("../lib");

const nearestCenter = async (context, event, callback) => {
  let responseObject = {};
  let memory = JSON.parse(event.Memory);
  const postalCode =
    memory.twilio.collected_data.ask_questions.answers.PostalCode.answer;

  const top3 = await getTop3Centers(postalCode);
  const result = defaultAssementCodeTxt(top3);
  responseObject = {
    actions: [
      {
        say: result
      },
      {
        redirect: "task://information_router"
      },
      {
        listen: false
      }
    ]
  };
  callback(null, responseObject);
};

exports.handler = nearestCenter;
