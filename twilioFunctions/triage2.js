exports.handler = function(context, event, callback) {
	let responseObject = {};
	let message = {};
	let memory = JSON.parse(event.Memory);
	
	let Breathing = memory.twilio.collected_data.ask_questions.answers.Breathing.answer || 'No';

	
	if ( Breathing == 'Yes' ){
	    message = `Call 911 or go to the nearest Emergency Department. Don't use public transport, cover cough, avoid touching face, and follow other guidelines.`;
	
	    responseObject = {
	    "actions": [
		        {
		            "say": message
		        },
		        {
				"redirect": "task://getHospitalPostalCode"
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
			"redirect": "task://Questions3"
    		},
    		{
    			"listen": false
    		}
	   ]
	};
	}
	
	callback(null,responseObject);
};