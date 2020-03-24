'use strict'
module.exports = (sequelize, DataTypes) => {
  const CenterDetails = sequelize.define('CenterDetails', {
    CenterName: DataTypes.STRING,
    StreetAddress: DataTypes.STRING,
    City: DataTypes.STRING,
    Province: DataTypes.STRING,
    PostalCode: DataTypes.STRING,
    PhoneNumber: DataTypes.STRING,
    PID: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT
  }, {})
  CenterDetails.associate = function (models) {
    // associations can be defined here
  }
  return CenterDetails
}
