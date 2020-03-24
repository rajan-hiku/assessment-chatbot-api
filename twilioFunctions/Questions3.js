exports.handler = function(context, event, callback) {
	let questions = [
	    {
	        "question":{
	          "say": "The rest of this assessment will ask you questions to determine whether or not you will require COVID-19 testing.Do you have any of the following:\n Temperature greater than 38°C or 100.4°F , Cough , Shortness of breath , Muscle aches, Fatigue, Headache , Sore throat, Runny nose or Diarrhea.\n Symptoms in young children may also be non-specific (for example, Lethargy, Poor feeding).\n Reply Yes or No"
	            
	        },
	        "name": "Breathing",
	        "type": "Twilio.YES_NO"
	    }
	 ];
	 
	 let responseObject = {
	     "actions": [
	         {
	             "collect": {
	                 "name": "ask_questions",
	                 "questions": questions,
	                 "on_complete": {
	                     "redirect": "task://evaluate-answers3"
	                 }
	             }
	         }]
	 };
	 callback(null,responseObject);
};
