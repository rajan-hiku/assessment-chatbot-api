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

Convert to twilio format - see nearestCenter Example

### Deploy

Rollup will build project in twilio format ( module.exports,etc and common.js)
then twilio deploy can deploy the app
