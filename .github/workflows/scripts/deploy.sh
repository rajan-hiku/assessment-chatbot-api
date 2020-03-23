#!/bin/sh
twilio-run deploy --account-sid="$ACCOUNT_SID" --auth-token="$AUTH_TOKEN"
ta update --schema COVID19BOT1.json --account-sid="$ACCOUNT_SID" --auth-token="$AUTH_TOKEN"