import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    await queryInterface.createTable('order', {
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
      transshipment: {
        type: Sequelize.DECIMAL,
        precision: 10,
        scale: 2,
        allowNull: false,
      },
      note: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      evaluation: {
        type: Sequelize.DECIMAL,
        precision: 10,
        scale: 2,
        allowNull: true,
        defaultValue: 0,
      },
      commission: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      client_id: {
        type: Sequelize.INTEGER,
        references: { model: 'client', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
        references: { model: 'establishment', key: 'id' },
      },
      evaluation_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'evaluation', key: 'id' },
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

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('order');
  },
};
