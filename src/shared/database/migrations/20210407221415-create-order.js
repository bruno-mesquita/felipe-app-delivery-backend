'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      payment: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      total: {
        type: Sequelize.DECIMAL,
        precision: 10,
        scale: 2,
        allowNull: false,
      },
      discount: {
        type: Sequelize.DECIMAL,
        precision: 10,
        scale: 2,
        allowNull: true,
        defaultValue: 0,
      },
      client_order_status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      order_status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      freight_value: {
        type: Sequelize.DECIMAL,
        precision: 10,
        scale: 2,
        allowNull: false,
      },
      address_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'address_client', key: 'id' },
      },
      establishment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'establishments', key: 'id' },
      },
      evaluation_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'evaluations', key: 'id' },
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('orders');
  }
};
