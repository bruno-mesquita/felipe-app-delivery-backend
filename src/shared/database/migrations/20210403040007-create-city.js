"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cities', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      state_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'states',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
    await queryInterface.dropTable('cities');
  }
};
exports.default = _default;