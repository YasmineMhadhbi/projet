'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentMethod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PaymentMethod.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The 'name' field is required."
          },
          notEmpty: {
            msg: "The 'name' field cannot be empty."
          },}
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The 'description' field is required."
          },
          notEmpty: {
            msg: "The 'description' field cannot be empty."
          },}
      },
    },{
    sequelize,
    modelName: 'PaymentMethod',
  });
  return PaymentMethod;
};