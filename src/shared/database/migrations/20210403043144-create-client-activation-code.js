"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('client_activation_code', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      client_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'clients',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      attempts: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('client_activation_code');
  }
};
exports.default = _default;