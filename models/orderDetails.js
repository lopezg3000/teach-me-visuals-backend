'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orderDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      orderDetails.belongsTo(models.user, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });

      orderDetails.belongsTo(models.paymentDetails, {
        foreignKey: 'paymentId',
        onDelete: 'CASCADE'
      });

      orderDetails.hasMany(models.orderItems, {
        foreignKey: 'orderId'
      });
    }
  };
  orderDetails.init({
    userId: DataTypes.INTEGER,
    total: DataTypes.DECIMAL,
    paymentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'orderDetails',
    freezeTableName: true
  });
  return orderDetails;
};