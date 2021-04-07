'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('categories', [
      {
        id: 1,
        name: 'Lanchonetes',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        name: 'Pizzarias',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        name: 'Restaurantes',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        name: 'Bares',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
