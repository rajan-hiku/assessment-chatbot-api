const { airTableBase, messagesTable } = require('../constants')

exports.handler = function (context, event, callback) {
	let responseObject = {};
	let message = {};
	let memory = JSON.parse(event.Memory);

	let Breathing = memory.twilio.collected_data.ask_questions.answers.Breathing.answer || 'No';


	if (Breathing == 'No') {

		airTableBase(messagesTable)
			.select({ filterByFormula: 'AND(SEARCH("Evaluate-Answers4A", Name),SEARCH("Both",BotType))' }).eachPage(function page(records, fetchNextPage) {
				message = records[0].fields.Message
				responseObject = {
					actions: [
						{
							say: message
						},
						{
							redirect: 'https://assessment-center-api-4281-dev.twil.io/informationRoute'
						},
						{
							listen: true
						}
					]
				}
				callback(null, responseObject)
			})
	} else {

		airTableBase(messagesTable)
			.select({ filterByFormula: 'AND(SEARCH("Evaluate-Answers4B", Name),SEARCH("Both",BotType))' }).eachPage(function page(records, fetchNextPage) {
				message = records[0].fields.Message
				responseObject = {
					actions: [
						{
							say: message
						},
						{
							redirect: 'https://assessment-center-api-4281-dev.twil.io/getPostalCode'
						},
						{
							listen: true
						}
					]
				}
				callback(null, responseObject)
			})
	}

};