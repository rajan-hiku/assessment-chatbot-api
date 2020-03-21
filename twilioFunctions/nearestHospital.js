const { getTop3Centers, defaultAssementCodeTxt } = require("../lib");
const table = "CenterDetails";
const nearestCenter = async (context, event, callback) => {
  let responseObject = {};
  let memory = JSON.parse(event.Memory);
  const postalCode =
    memory.twilio.collected_data.ask_questions.answers.PostalCode.answer;

  const top3 = await getTop3Centers(table, postalCode);
  const result = defaultAssementCodeTxt(
    "The 3 closest hospitals center to you are:",
    top3
  );

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
