import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    await queryInterface.addColumn('address_client', 'neighborhood_id', {
      type: Sequelize.INTEGER,
      references: { model: 'neighborhood', key: 'id' },
      allowNull: true,
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn('address_client', 'neighborhood_id');
  },
};
