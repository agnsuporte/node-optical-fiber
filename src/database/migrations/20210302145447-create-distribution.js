/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Distributions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      NetworkId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Networks',
          },
          key: 'id'
        },
        allowNull: false
      },
      DeviceId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Devices',
          },
          key: 'id'
        },
        allowNull: false
      },
      numFiberActive: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Distributions');
  }
};
