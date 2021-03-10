"use strict";
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("Users", [
      {
        user_name: "Teste",
        user_username: "Teste",
        user_email: "testi@example.com",
        user_password: bcrypt.hashSync("testi123", salt),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Users", null, {});
  },
};
