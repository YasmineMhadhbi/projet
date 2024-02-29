'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductDetail extends Model {
    static associate(models) {
      ProductDetail.belongsTo(models.Product);
      ProductDetail.belongsTo(models.Cart);
    }
  }

  ProductDetail.init({
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductDetail',
  });

  ProductDetail.associate = (models) => {
    ProductDetail.belongsToMany(models.Product, { through: 'ProductDetails' });
    ProductDetail.belongsToMany(models.Cart, { through: 'ProductDetails' });
  };

  return ProductDetail;
};
