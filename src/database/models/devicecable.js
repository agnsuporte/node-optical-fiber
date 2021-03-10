"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class DeviceCable extends Model {
    static associate(models) {
      // define association here
    }
  }
  DeviceCable.init(
    {
      DeviceId: DataTypes.INTEGER,
      CableId: DataTypes.INTEGER,
      typeLink: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "DeviceCable",
      timestamps: false,
    }
  );
  return DeviceCable;
};
