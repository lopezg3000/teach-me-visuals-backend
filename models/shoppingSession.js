'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shoppingSession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      shoppingSession.belongsTo(models.user, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });

      shoppingSession.hasMany(models.cart, {
        foreignKey: 'sessionId'
      });
    }
  };
  shoppingSession.init({
    userId: DataTypes.INTEGER,
    total: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'shoppingSession',
    freezeTableName: true
  });
  return shoppingSession;
};