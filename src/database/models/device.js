"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Device extends Model {
    static associate(models) {
      this.belongsTo(models.Project);
      this.belongsToMany(models.Cable, { through: models.DeviceCable });
    }
  }
  Device.init(
    {
      ProjectId: DataTypes.INTEGER,
      deviceName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Device",
    }
  );
  return Device;
};
