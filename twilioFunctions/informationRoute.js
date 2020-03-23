const { airTableBase, messagesTable } = require('../constants');

const informationRouter = function(context, event, callback) {
    let message = {};
    

    let responseObject = {
        "actions": [
        {
            "say" : message
        },
        {
            "listen": {
                "voice_digits": {
                    "redirects": {
                        "0": "task://LanguageSelection",
                        "1": "task://newsupdate",
                        "2": "task://questions",
                        "3": "task://self-isolation",
                        "4": "task://safety-tips",
                        "5": "task://goodbye"
                    },
                    "finish_on_key": "#",
                    "num_digits": 1
                }
            }
        }
    ]
    }
    callback(null, responseObject);
};

exports.handler = informationRouter;