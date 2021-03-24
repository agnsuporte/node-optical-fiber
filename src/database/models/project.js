const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      this.belongsTo(models.User);
      this.hasMany(models.Cable);
      this.hasMany(models.Device);
      this.hasMany(models.Network);
    }
  }
  Project.init(
    {
      projectName: DataTypes.STRING,
      projectCompany: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Project',
    }
  );
  return Project;
};
