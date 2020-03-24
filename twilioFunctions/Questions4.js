exports.handler = function(context, event, callback) {
	let questions = [
	    {
	        "question":{
	            "say": "In the past 14 days have you had close contact with someone who is confirmed as having COVID-19 OR traveled outside Canada.\n Reply Yes or No "	            
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
	                     "redirect": "task://evaluate-answers4"
	                 }
	             }
	         }]
	 };
	 callback(null,responseObject);
};