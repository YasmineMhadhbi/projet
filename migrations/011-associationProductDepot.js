'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    return queryInterface.addColumn(
      'Depots', // name of Target model
      'ProductId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'SubCategories', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Depots', // name of the Target model
      'ProductId' // key we want to remove
    );
  }
};
