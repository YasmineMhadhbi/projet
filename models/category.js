// Category model
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.SubCategory);
    }
  }

  Category.init(
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
    },
    {
      sequelize,
      modelName: 'Category',
    },
  );

  return Category;
};
