'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    return queryInterface.addColumn(
      'Products', // name of Target model
      'SubCategoryId', // name of the key we're adding
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
      'Products', // name of the Target model
      'SubCategoryId' // key we want to remove
    );
  }
};
