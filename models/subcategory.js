// SubCategory model
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SubCategory extends Model {
    static associate(models) {
      SubCategory.belongsTo(models.Category); 
      SubCategory.hasMany(models.Product);
      // Each SubCategory can have multiple Categories
    }
  }
  SubCategory.init({
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
          msg: "The 'name' field is required."
        },
        notEmpty: {
          msg: "The 'name' field cannot be empty."
        },}
    }, }, {
    sequelize,
    modelName: 'SubCategory',
  });

  return SubCategory;
};
