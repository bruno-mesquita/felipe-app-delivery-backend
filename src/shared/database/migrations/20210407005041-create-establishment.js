'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('establishments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
      opening_time: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      closing_time: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      freight_value: {
        type: Sequelize.DECIMAL,
        precision: 10,
        scale: 2,
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      evaluation: {
        type: Sequelize.DECIMAL,
        precision: 10,
        scale: 2,
        allowNull: false,
      },
      image_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'images', key: 'id' },
      },
      address_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'address_establishment', key: 'id' },
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
    await queryInterface.dropTable('establishments');
  }
};
