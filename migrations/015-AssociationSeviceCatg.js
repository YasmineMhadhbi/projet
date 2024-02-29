'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {



    return queryInterface.addColumn(
      'Services', // name of Target model
      'ServiceCategoryId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'ServiceCategories', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Services', // name of the Target model
      'ServiceCategoryId' // key we want to remove
    );
  }
}
