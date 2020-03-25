const opencage = require('opencage-api-client')
const { db } = require('../constants')

const haversineDistance = require('./haversineDistance')

const getTop3Centers = async (tableName = 'CenterDetails', postalCode) => {
  const { lat: _lat, lng: _lng } = await getLatFromPostalCode(postalCode)
  const userLatLng = { lat: _lat, lng: _lng }

  const result = await db[tableName].findAll({ raw: true })
  const distanceHash = []
  result.forEach(({ id, lat, lng, ...rest }) => {
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
    const { results } = await opencage.geocode({ q: `${postalCode},Canada` })
    // geometry defaults to Toronto
    const { geometry } = (Array.isArray(results) &&
      results.length > 0 &&
      results[0]) || { lat: 43.6915, lng: -79.4307 }
    return geometry
  } catch (error) {
    return error
  }
}

const defaultAssementCodeTxt = (startTxt, centers = []) => {
  let resultTxt = `${startTxt} \n`
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
    resultTxt =
      resultTxt +
      `${CenterName} ${StreetAddress} ${City}, ${Province} ${PostalCode}`
    resultTxt = resultTxt + '\n '
  })
  resultTxt =
    resultTxt +
    'If your symptoms significanly worsen call 911 or go to the nearest Emergency Department .'
  return resultTxt
}

const defaultHospitalCodeTxt = (startTxt, centers = []) => {
  let resultTxt = `${startTxt} \n`
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
    const { HospitalName, StreetAddress, City, Province, PostalCode } = center
    resultTxt =
      resultTxt +
      `${HospitalName} ${StreetAddress} ${City}, ${Province} ${PostalCode}`
    resultTxt = resultTxt + '\n '
  })
  resultTxt =
    resultTxt +
    'If your symptoms significanly worsen call 911 or go to the nearest Emergency Department .'
  return resultTxt
}
module.exports = {
  getLatFromPostalCode,
  getTop3Centers,
  defaultAssementCodeTxt,
  defaultHospitalCodeTxt
}
