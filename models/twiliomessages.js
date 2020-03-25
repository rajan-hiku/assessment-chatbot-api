'use strict';
module.exports = (sequelize, DataTypes) => {
  const TwilioMessages = sequelize.define('TwilioMessages', {
    Name: DataTypes.STRING,
    Message: DataTypes.TEXT('long'),
    BotType: DataTypes.STRING,
    Language: DataTypes.STRING
  }, {});
  TwilioMessages.associate = function(models) {
    // associations can be defined here
  };
  return TwilioMessages;
};