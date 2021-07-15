"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('evaluations', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      value: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      message: {
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
    await queryInterface.dropTable('evaluations');
  }
};
exports.default = _default;