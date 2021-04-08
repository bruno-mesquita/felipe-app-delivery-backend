'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('establishments', 'evaluation', {
      type: Sequelize.DECIMAL,
      precision: 10,
      scale: 2,
      allowNull: true,
      defaultValue: 0
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('establishments', 'evaluation');
  }
};
