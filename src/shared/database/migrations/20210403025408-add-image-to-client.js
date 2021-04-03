'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('clients', 'avatar_id', {
      type: Sequelize.INTEGER,
      references: { model: 'images', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('clients', 'avatar_id');
  }
};
