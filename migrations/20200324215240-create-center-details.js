'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CenterDetails', {
      CenterName: {
        type: Sequelize.STRING
      },
      StreetAddress: {
        type: Sequelize.STRING
      },
      City: {
        type: Sequelize.STRING
      },
      Province: {
        type: Sequelize.STRING
      },
      PostalCode: {
        type: Sequelize.STRING
      },
      PhoneNumber: {
        type: Sequelize.STRING
      },
      PID: {
        type: Sequelize.STRING
      },
      lat: {
        type: Sequelize.FLOAT
      },
      lng: {
        type: Sequelize.FLOAT
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CenterDetails')
  }
}
