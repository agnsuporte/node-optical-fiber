'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cableName: {
        type: Sequelize.STRING
      },
      cableCapacity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ProjectId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Projects',
          },
          key: 'id'
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Cables');
  }
};