'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orderItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      orderItems.belongsTo(models.product, {
        foreignKey: 'productId',
        onDelete: 'CASCADE'
      });

      orderItems.belongsTo(models.orderDetails, {
        foreignKey: 'orderId',
        onDelete: 'CASCADE'
      });
    }
  };
  orderItems.init({
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'orderItems',
    freezeTableName: true
  });
  return orderItems;
};