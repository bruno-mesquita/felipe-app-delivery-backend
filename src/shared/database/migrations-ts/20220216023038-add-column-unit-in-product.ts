import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    await queryInterface.addColumn('product', 'unit', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    });
  },

  down: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    await queryInterface.removeColumn('product', 'unit');
  },
};
