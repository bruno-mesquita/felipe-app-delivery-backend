import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    await queryInterface.addColumn('establishment-owner','created_by_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'city-manager', key: 'id' },
    });
  },

  down: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    await queryInterface.removeColumn('establishment-owner','created_by_id');
  }
};
