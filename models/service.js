'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Service.belongsTo(models.ServiceCategory); 
      Service.hasMany(models.Quote);

    }
  }
  Service.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    cost: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};