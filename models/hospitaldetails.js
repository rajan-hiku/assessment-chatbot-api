'use strict';
module.exports = (sequelize, DataTypes) => {
  const HospitalDetails = sequelize.define('HospitalDetails', {
    HospitalName: DataTypes.STRING,
    StreetAddress: DataTypes.STRING,
    City: DataTypes.STRING,
    Province: DataTypes.STRING,
    PostalCode: DataTypes.STRING,
    PhoneNumber: DataTypes.STRING,
    PID: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT
  }, {});
  HospitalDetails.associate = function(models) {
    // associations can be defined here
  };
  return HospitalDetails;
};