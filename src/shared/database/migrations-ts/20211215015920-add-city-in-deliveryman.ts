import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    await queryInterface.addColumn('deliveryman','city_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'city', key: 'id' },
    });
  },

  down: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    await queryInterface.removeColumn('deliveryman','city_id');
  }
};
