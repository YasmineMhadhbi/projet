module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Products', // table name
        'size', // new field name
        {
          type: Sequelize.DOUBLE,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Products',
        'color',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Products',
        'discount',
        {
          type: Sequelize.DOUBLE,
          allowNull: true,
        },
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn('Products', 'size'),
      queryInterface.removeColumn('Products', 'color'),
      queryInterface.removeColumn('Products', 'discount'),
    ]);
  },
};