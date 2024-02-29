'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {



    return queryInterface.addColumn(
      'Quotes', // name of Target model
      'ServiceId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Services', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Quotes', // name of the Target model
      'ServiceId' // key we want to remove
    );
  }
}
