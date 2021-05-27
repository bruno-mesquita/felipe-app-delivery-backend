'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tickets', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      barcode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date_created: {
        type: Sequelize.DATE,
        allowNull: false,
        unique: true,
      },
      price: {
        type: Sequelize.NUMBER,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      link: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status_detail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      verification_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      payment_method_reference_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date_of_expiration: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      date_last_updated: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      reference_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      establishment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'establishments', key: 'id' },
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
    await queryInterface.dropTable('tickets');
  }
};
