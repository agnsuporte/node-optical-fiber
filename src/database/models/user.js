"use strict";
const CryptoJS = require("crypto-js");
const { Model } = require("sequelize");

const secret = process.env.JWT_SECRET_PRIVATE_KEY;

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Project);
    }

    static generateHash(textToHash) {
      return CryptoJS.HmacSHA1(textToHash, secret).toString(CryptoJS.enc.Hex);
    }

    static compareHash(hash, textCompare) {
      const compare = CryptoJS.HmacSHA1(textCompare, secret).toString(
        CryptoJS.enc.Hex
      );
      return compare === hash ? true : false;
    }
  }

  User.init(
    {
      userName: DataTypes.STRING,
      userUsername: DataTypes.STRING,
      userEmail: DataTypes.STRING,
      userPassword: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue('userPassword', User.generateHash(value));
        }
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  // User.beforeSave((user, optoins) => {
  //   if (user.userPassword) {
  //     user.userPassword = User.generateHash(user.userPassword);
  //   }
  // });


  return User;
};
