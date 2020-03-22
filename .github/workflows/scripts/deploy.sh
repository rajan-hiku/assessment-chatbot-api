#!/bin/sh
npm run build && twilio-run deploy --account-sid="$ACCOUNT_SID" --auth-toke="$AUTH_TOKEN" && ta update --schema COVID19BOT1.json