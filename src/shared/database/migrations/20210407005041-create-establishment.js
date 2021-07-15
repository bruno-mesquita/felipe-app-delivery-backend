"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('establishments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cellphone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      opening_time: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      closing_time: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      freight_value: {
        type: Sequelize.DECIMAL,
        precision: 10,
        scale: 2,
        allowNull: false
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      evaluation: {
        type: Sequelize.DECIMAL,
        precision: 10,
        scale: 2,
        allowNull: true
      },
      image_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'images',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      address_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'address_establishment',
          key: 'id'
        },
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('establishments');
  }
};
exports.default = _default;