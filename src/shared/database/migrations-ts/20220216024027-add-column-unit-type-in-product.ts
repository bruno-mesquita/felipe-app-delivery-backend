import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    await queryInterface.addColumn('product', 'unit_type', {
      type: Sequelize.STRING(10),
      allowNull: false,
      defaultValue: 'Un',
    });
  },

  down: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    await queryInterface.removeColumn('product', 'unit_type');
  },
};
