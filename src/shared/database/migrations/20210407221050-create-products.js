"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
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
      price: {
        type: Sequelize.DECIMAL,
        precision: 10,
        scale: 2,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      image_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'images',
          key: 'id'
        }
      },
      menu_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'menus',
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
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      }
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('products');
  }
};
exports.default = _default;