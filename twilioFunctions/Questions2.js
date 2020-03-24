exports.handler = function(context, event, callback) {
	let questions = [
	    {
	        "question":{
	            "say": "Are you experiencing any of the following:\n Short of breath at rest , Inability to lie down because of difficulty breathing , Chronic health conditions that you are having difficulty managing because of your current respiratory illness.\n Reply Yes or  No"
	            
	        },
	        "name": "question2",
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
	                     "redirect": "https://assessment-center-api-4281-dev.twil.io/triage2"
	                 }
	             }
	         }]
	 };
	 callback(null,responseObject);
};
