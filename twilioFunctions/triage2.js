const { airTableBase, messagesTable } = require('../constants')

exports.handler = function(context, event, callback) {
	let responseObject = {};
	let message = {};
	let memory = JSON.parse(event.Memory);
	
	let Breathing = memory.twilio.collected_data.ask_questions.answers.Breathing.answer;

	
	if ( Breathing == 'Yes' ){
	    airTableBase(messagesTable)
      		.select({ filterByFormula: 'AND(SEARCH("Evaluate-Answers", Name),SEARCH("Both",BotType))' }).eachPage(function page (records, fetchNextPage) {
        message = records[0].fields.Message
        responseObject = {
          actions: [
            {
              say: message
            },
            {
              redirect: 'https://assessment-center-api-4281-dev.twil.io/getHospitalPostalCode'
            },
            {
              listen: true
            }
          ]
        }
        callback(null, responseObject)
      })
	}else {
	   	responseObject = {
	    "actions": [
				{
				"redirect": "https://assessment-center-api-4281-dev.twil.io/Questions3"
				},
				{
					"listen": false
				}
	   		]
		};
		callback(null,responseObject);
	}
	

};