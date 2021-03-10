"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Network extends Model {
    static associate(models) {
      this.belongsTo(models.Project);
    }
  }
  Network.init(
    {
      ProjectId: DataTypes.INTEGER,
      networkName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Network",
    }
  );
  return Network;
};
