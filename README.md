### Made for the COVID19 Chat bot

Api below

# /nearestCenter

### Build

`npm run build` this will use rollup to create a file compatible with twilio
`npm run deploy` will deploy app to twilio env

### Running locally

import your function from twilioFunctions to app.js routes
use post body like this
const postalCode = req.body.postalCode;
// Pushing into Twilio format

Convert to twilio format
const mem = JSON.stringify({
twilio: {
collected_data: {
ask_questions: {
answers: {
PostalCode: {
answer: postalCode
}
}
}
}
}
});
