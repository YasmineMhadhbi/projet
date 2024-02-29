'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {



    return queryInterface.addColumn(
      'SubCategories', // name of Target model
      'CategoryId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'SubCategories', // name of the Target model
      'CategoryId' // key we want to remove
    );
  }
}
