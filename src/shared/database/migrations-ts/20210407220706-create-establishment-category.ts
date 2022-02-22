import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    await queryInterface.createTable('establishment_category', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'category', key: 'id' },
      },
      establishment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'establishment', key: 'id' },
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

  down: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    await queryInterface.dropTable('establishment_category');
  },
};
