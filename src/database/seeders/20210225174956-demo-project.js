"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     *
     */

    return await queryInterface.bulkInsert("Projects", [
      {
        user_id: 1,
        project_name: "John Doe",
        project_company: "Test LDA",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     *
     */

    return await queryInterface.bulkDelete("Projects", null, {});
  },
};
