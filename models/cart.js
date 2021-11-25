'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      cart.belongsTo(models.product, {
        foreignKey: 'productId',
        onDelete: 'CASCADE'
      });

      cart.belongsTo(models.shoppingSession, {
        foreignKey: 'sessionId',
        onDelete: 'CASCADE'
      });
    }
  };
  cart.init({
    sessionId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cart',
    freezeTableName: true
  });
  return cart;
};