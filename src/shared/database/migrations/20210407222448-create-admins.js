"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('admins', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(60),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cellphone: {
        type: Sequelize.STRING(15),
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
    await queryInterface.dropTable('admins');
  }
};
exports.default = _default;