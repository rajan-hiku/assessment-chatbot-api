exports.handler = function(context, event, callback) {
	let responseObject = {};
	let message = {};
	let memory = JSON.parse(event.Memory);
	
	let Breathing = memory.twilio.collected_data.ask_questions.answers.Breathing.answer || 'No';

	
	if ( Breathing == 'No' ){
	    message = `Since you don’t have any COVID-19 symptoms, you likely don’t need to be tested for COVID-19.
If you get any COVID-19 symptoms, take this self-assessment again. If you need more information, visit https://www.canada.ca/coronavirus
If you are experiencing other symptoms and want assessment, contact your primary care provider (for example, family doctor) or your local tele health line.`;
	
	    responseObject = {
	    "actions": [
	        {
	            "say": message
	        },
	        {
			"redirect": "https://assessment-center-api-4281-dev.twil.io/informationRoute"
    		},
    		{
    			"listen": false
    		}
	   ]
	};
	}else {
	   	responseObject = {
	    "actions": [
	        {
			"redirect": "https://assessment-center-api-4281-dev.twil.io/Questions4"
    		},
    		{
    			"listen": false
    		}
	   ]
	};
	}
	
	callback(null,responseObject);
};