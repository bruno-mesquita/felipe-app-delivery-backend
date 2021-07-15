"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('clients', {
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
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cellphone: {
        type: Sequelize.STRING(15),
        allowNull: false
      },
      cpf: {
        type: Sequelize.STRING(11),
        allowNull: false,
        unique: true
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      avatar_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'images',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      }
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('clients');
  }
};
exports.default = _default;