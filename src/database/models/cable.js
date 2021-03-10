"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Cable extends Model {
    static associate(models) {
      this.belongsTo(models.Project);
      this.belongsToMany(models.Device, { through: models.DeviceCable });
    }
  }
  Cable.init(
    {
      ProjectId: DataTypes.INTEGER,
      cableName: DataTypes.STRING,
      cableCapacity: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Cable",
    }
  );
  return Cable;
};
