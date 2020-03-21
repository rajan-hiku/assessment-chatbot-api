'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var opencageApiClient = _interopDefault(require('opencage-api-client'));
var airtable = _interopDefault(require('airtable'));

const asin = Math.asin;
const cos = Math.cos;
const sin = Math.sin;
const sqrt = Math.sqrt;
const PI = Math.PI;

// equatorial mean radius of Earth (in meters)
const R = 6378137;

function squared (x) { return x * x }
function toRad (x) { return x * PI / 180.0 }
function hav (x) {
  return squared(sin(x / 2))
}

// hav(theta) = hav(bLat - aLat) + cos(aLat) * cos(bLat) * hav(bLon - aLon)
function haversineDistance (a, b) {
  const aLat = toRad(Array.isArray(a) ? a[1] : a.latitude || a.lat);
  const bLat = toRad(Array.isArray(b) ? b[1] : b.latitude || b.lat);
  const aLng = toRad(Array.isArray(a) ? a[0] : a.longitude || a.lng || a.lon);
  const bLng = toRad(Array.isArray(b) ? b[0] : b.longitude || b.lng || b.lon);

  const ht = hav(bLat - aLat) + cos(aLat) * cos(bLat) * hav(bLng - aLng);
  return 2 * R * asin(sqrt(ht))
}

var haversineDistance_1 = haversineDistance;

var base = new airtable({ apiKey: process.env.AIRTABLE }).base(
  "appZv8bkFustjCUXN"
);


const getTop3Centers = async (tableName = "CenterDetails", postalCode) => {
  const { lat: _lat, lng: _lng } = await getLatFromPostalCode(postalCode);
  const userLatLng = { lat: _lat, lng: _lng };
  const record = await base(tableName)
    .select()
    .all();
  const distanceHash = [];
  record.forEach(({ id, fields }) => {
    const { lat, lng, ...rest } = fields;
    const centerLatLng = { lat, lon: lng };
    distanceHash.push({
      id,
      distance: haversineDistance_1(userLatLng, centerLatLng),
      ...rest
    });
  });
  distanceHash.sort((a, b) => a.distance - b.distance);
  const top3 = distanceHash.slice(0, 3);
  return top3;
};

const getLatFromPostalCode = async postalCode => {
  try {
    const { results } = await opencageApiClient.geocode({ q: `${postalCode},Canada` });
    console.log(results);
    // geometry defaults to Toronto
    const { geometry } = (Array.isArray(results) &&
      results.length > 0 &&
      results[0]) || { lat: 43.6915, lng: -79.4307 };
    return geometry;
  } catch (error) {
    return error;
  }
};

const defaultAssementCodeTxt = (startTxt, centers = []) => {
  let resultTxt = `${startTxt} \n`;
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
    const { CenterName, StreetAddress, City, Province, PostalCode } = center;
    resultTxt =
      resultTxt +
      `${CenterName} ${StreetAddress} ${City}, ${Province} ${PostalCode}`;
    resultTxt = resultTxt + "\n ";
  });
  resultTxt =
    resultTxt +
    "If your symptoms significanly worsen call 911 or go to the nearest Emergency Department .";
  return resultTxt;
};

var lib = {
  getLatFromPostalCode,
  getTop3Centers,
  defaultAssementCodeTxt
};

const { getTop3Centers: getTop3Centers$1, defaultAssementCodeTxt: defaultAssementCodeTxt$1 } = lib;
const table = "CenterDetails";
const nearestCenter = async (context, event, callback) => {
  let responseObject = {};
  let memory = JSON.parse(event.Memory);
  const postalCode =
    memory.twilio.collected_data.ask_questions.answers.PostalCode.answer;

  const top3 = await getTop3Centers$1(table, postalCode);
  const result = defaultAssementCodeTxt$1(
    "The 3 closest assessment center to you are:",
    top3
  );
  responseObject = {
    actions: [
      {
        say: result
      },
      {
        redirect: "task://information_router"
      },
      {
        listen: false
      }
    ]
  };
  callback(null, responseObject);
};

var handler = nearestCenter;

var nearestCenter_1 = {
	handler: handler
};

exports.default = nearestCenter_1;
exports.handler = handler;
