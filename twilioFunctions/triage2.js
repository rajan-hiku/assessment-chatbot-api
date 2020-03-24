exports.handler = function(context, event, callback) {
	let responseObject = {};
	let message = {};
	let memory = JSON.parse(event.Memory);
	
	let Breathing = memory.twilio.collected_data.ask_questions.answers.question2.answer;

	
	if ( Breathing == 'Yes' ){
	    message = `Call 911 or go to the nearest Emergency Department. Don't use public transport, cover cough, avoid touching face, and follow other guidelines.`;
	
	    responseObject = {
	    "actions": [
		        {
		            "say": message
		        },
		        {
				"redirect": "https://assessment-center-api-4281-dev.twil.io/getHospitalPostalCode"
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
			"redirect": "https://assessment-center-api-4281-dev.twil.io/Questions3"
    		},
    		{
    			"listen": false
    		}
	   ]
	};
	}
	
	callback(null,responseObject);
};