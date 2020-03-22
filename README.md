### Made for the COVID19 Chat bot

### How to add a new Function
1. Create a .js file in /twillioFunctions
2. Ensure the function exports using exports.handler
```
const nearestCenter = async (context, event, callback) => {
}

exports.handler = nearestCenter

```
3. To test locally, add the as a route to express 
4. See the example below 

```router.post('/nearestHospital', async (req, res) => {
  const postalCode = req.body.postalCode
  // Pushing into Twilio format
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
  })

  const event = {
    Memory: mem
  }
  const callback = (err, respond) => {
    if (err) res.send(err)
    res.send(respond)
  }
  const { handler } = require('./twilioFunctions/nearestHospital')
  handler(null, event, callback)
})

I am using .post to send a postalCode as a JSON 
```
5. Add a new rollup.config.js object
```
{
    input: 'twilioFunctions/${Name}.js',
    output: {
      file: 'functions/${Name}.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  },
```
`Remember to add this in the existing array`

6. Now, just do npm run deploy, this will create a new function in /functions folder and upload it to twilio

