'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DeviceCables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      CableId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Cables',
          },
          key: 'id'
        },
        allowNull: false
      },
      typeLink: {
        type: Sequelize.STRING(1),
        defaultValue: "I",
        validate: {
          isIn: [['I', 'O']],
        }
      }
      
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('DeviceCables');
  }
};