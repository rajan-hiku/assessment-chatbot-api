
const haversine = require('./haversineDistance')
const opencage = require('opencage-api-client')
const airtableBase = 'CenterDetails'
const Airtable = require('airtable')
var base = new Airtable({ apiKey: process.env.AIRTABLE }).base(
    'appZv8bkFustjCUXN'
)

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
            distance: haversine(userLatLng, centerLatLng),
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

module.exports = {
    getLatFromPostalCode,
    getTop3Centers
}
