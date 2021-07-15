"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('address_establishment', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      city_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cities',
          key: 'id'
        }
      },
      street: {
        type: Sequelize.STRING,
        allowNull: false
      },
      number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      neighborhood: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cep: {
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
    await queryInterface.dropTable('address_establishment');
  }
};
exports.default = _default;