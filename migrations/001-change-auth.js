'use strict';

const { type } = require('os');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('auths', 'userName', 'email');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('auths', 'email', 'userName');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
