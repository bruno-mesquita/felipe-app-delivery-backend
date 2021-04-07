'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('establishment', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      image_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'images', key: 'id' },
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'categories', key: 'id' },
      },
      address_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'address_establishment', key: 'id' },
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cellphone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      openingTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      closingTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      freightValue: {
        type: Sequelize.DECIMAL,
        precision: 10,
        scale: 2,
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('establishment');
  }
};
