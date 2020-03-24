const { airTableBase, messagesTable } = require('../constants')

const informationRouter = function (context, event, callback) {
  let message = ''
  airTableBase(messagesTable)
    .select({ filterByFormula: 'AND(SEARCH("Information_Router", Name),SEARCH("SMS",BotType))' })
    .eachPage(function page (records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.
      console.log(records[0].fields)
      message = records[0].fields.Message
      const responseObject = {
        actions: [
          {
            say: message
          },
          {
            listen: {
              voice_digits: {
                redirects: {
                  0: 'task://LanguageSelection',
                  1: 'task://newsupdate',
                  2: 'task://questions',
                  3: 'task://self-isolation',
                  4: 'task://safety-tips',
                  5: 'task://goodbye'
                },
                finish_on_key: '#',
                num_digits: 1
              }
            }
          }
        ]
      }
      callback(null, responseObject)
    }, function done (err) {
      if (err) { console.error(err) }
    })

  // Current PRod
  // [
  //   {
  //     say: 'For COVID-19 News Update Text 1. \r For COVID-19 Triage Text 2. \r For COVID-19 Self-isolation Text 3. \r For COVID-19 Prevention Tips Text 4. \r For Exit Text 5.'
  //   },
  //   {
  //     listen: {
  //       voice_digits: {
  //         redirects: {
  //           1: 'task://newsupdate',
  //           2: 'task://questions',
  //           3: 'task://self-isolation',
  //           4: 'task://safety-tips',
  //           5: 'task://goodbye'
  //         },
  //         finish_on_key: '#',
  //         num_digits: 1
  //       }
  //     }
  //   }
  // ]
}

exports.handler = informationRouter
