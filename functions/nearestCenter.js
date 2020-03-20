const opencage = require('opencage-api-client')
const airtableBase = 'CenterDetails'
const Airtable = require('airtable')
var base = new Airtable({ apiKey: process.env.AIRTABLE }).base(
  'appZv8bkFustjCUXN'
)

const asin = Math.asin
const cos = Math.cos
const sin = Math.sin
const sqrt = Math.sqrt
const PI = Math.PI

// equatorial mean radius of Earth (in meters)
const R = 6378137

function squared(x) { return x * x }
function toRad(x) { return x * PI / 180.0 }
function hav(x) {
  return squared(sin(x / 2))
}

// hav(theta) = hav(bLat - aLat) + cos(aLat) * cos(bLat) * hav(bLon - aLon)
function haversineDistance(a, b) {
  const aLat = toRad(Array.isArray(a) ? a[1] : a.latitude || a.lat)
  const bLat = toRad(Array.isArray(b) ? b[1] : b.latitude || b.lat)
  const aLng = toRad(Array.isArray(a) ? a[0] : a.longitude || a.lng || a.lon)
  const bLng = toRad(Array.isArray(b) ? b[0] : b.longitude || b.lng || b.lon)

  const ht = hav(bLat - aLat) + cos(aLat) * cos(bLat) * hav(bLng - aLng)
  return 2 * R * asin(sqrt(ht))
}


const getTop3Centers = async postalCode => {
  const { lat: _lat, lng: _lng } = await getLatFromPostalCode(postalCode)

  const userLatLng = { lat: _lat, lng: _lng }

  const record = await base(airtableBase)
    .select()
    .all()
  const distanceHash = []
  record.forEach(({ id, fields }) => {
    const { lat, lng, ...rest } = fields
    const centerLatLng = { lat, lon: lng }

    distanceHash.push({
      id,
      distance: haversineDistance(userLatLng, centerLatLng),
      ...rest
    })
  })

  distanceHash.sort((a, b) => a.distance - b.distance)

  const top3 = distanceHash.slice(0, 3)
  return top3
}

const getLatFromPostalCode = async postalCode => {
  try {
    const { results } = await opencage.geocode({ q: postalCode })
    // geometry defaults to Toronto
    const { geometry } = (Array.isArray(results) &&
      results.length > 0 &&
      results[0]) || { lat: 43.6915, lng: -79.4307 }
    return geometry
  } catch (error) {
    return error
  }
}

const defaultPostalCodeTxt = (centers = []) => {
  let resultTxt = 'Here are the 3 closest Assessment centers'
  centers.forEach(center => {
    // {
    //     "id": "recoETgz2HJeTjlWI",
    //     "distance": 5828.285340806428,
    //     "CenterName": "Unity - St. Michael's Hospital",
    //     "StreetAddress": "209 Victoria Street",
    //     "City": "Toronto",
    //     "Province": "ON",
    //     "PostalCode": "M5B 1T8",
    //     "PhoneNumber": "416-360-4000",
    //     "PID": "ChIJ7SFqkzTL1IkRHP4f8xxifIQ"
    // }
    const { CenterName, StreetAddress, City, Province, PostalCode } = center
    resultTxt = resultTxt + ` ${CenterName} ${StreetAddress} ${City}, ${Province} ${PostalCode}`
    resultTxt = resultTxt + ' /Line Break '
  })
  resultTxt = resultTxt + ' If your symptoms significanly worsen call 911 or go to the nearest Emergency Department'
  return resultTxt
}


const nearestCenter = async (context, event, callback) => {
  const twiml = new Twilio.twiml.VoiceResponse()
  const { postalCode } = context
  const top3 = await getTop3Centers(postalCode)
  const result = defaultPostalCodeTxt(top3)
  twiml.say(result);
  callback(null, twiml)
};

exports.handler = nearestCenter
