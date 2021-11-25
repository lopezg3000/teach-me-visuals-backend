'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.hasMany(models.cart, {
        foreignKey: 'productId'
      });

      product.hasMany(models.orderItems, {
        foreignKey: 'productId'
      });
    }
  };
  product.init({
    topic: DataTypes.STRING,
    grade: DataTypes.STRING,
    subject: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    likes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
    freezeTableName: true
  });
  return product;
};