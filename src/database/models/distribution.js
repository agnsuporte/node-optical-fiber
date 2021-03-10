'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Distribution extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Distribution.init({
    ProjectId: DataTypes.INTEGER,
    DeviceId: DataTypes.INTEGER,
    numFiberActive: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Distribution',
  });
  return Distribution;
};