exports.handler = function(context, event, callback) {
	let responseObject = {};
	let message = {};
	let memory = JSON.parse(event.Memory);
	
	let Breathing = memory.twilio.collected_data.ask_questions.answers.Breathing.answer || 'No';

	
	if ( Breathing == 'No' ){
	    message = `There are many common viruses other than COVID-19 that can cause your symptoms. Based on your responses you likely do not need to be tested for COVID-19 at this time. 
If your symptoms worsen, or if you are concerned, go to https://www.canada.ca/coronavirus, contact your primary care provider (for example, family doctor) or call your lcoal tele health line.`;
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
	 message = `Please Call HealthLine 811.
Based on the responses you've just provided, please call HealthLine 811 to have your symptoms assessed. HealthLine 811 is currently experiencing heavy call volumes and will get to your call as quickly as possible.
Please do not go to an emergency department, family doctor or walk-in clinic.
Because you have (or had) symptoms, you should self-isolate until your test results are available. That means don't go to any public places, stay at home, and don't have any visitors. If you have any questions, visit https://www.canada.ca/coronavirus`;
	    responseObject = {
	    "actions": [
	        {
	            "say": message
	        },
	        {
			"redirect": "https://assessment-center-api-4281-dev.twil.io/getPostalCode"
    		},
    		{
    			"listen": false
    		}
	   ]
	};
	}
	
	callback(null,responseObject);
};