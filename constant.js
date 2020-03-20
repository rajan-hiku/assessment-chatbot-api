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
    resultTxt = resultTxt + `${CenterName} ${StreetAddress} ${City}, ${Province} ${PostalCode}`
    resultTxt = resultTxt + ' /Line Break'
  })
  resultTxt = resultTxt + ' If your symptoms significanly worsen call 911 or go to the nearest Emergency Department'
  return resultTxt
}
module.exports = {
  defaultPostalCodeTxt
}
