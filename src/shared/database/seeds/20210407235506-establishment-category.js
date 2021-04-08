'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('establishment_category', [
      {
        id: 1,
        category_id: 1,
        establishment_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        category_id: 2,
        establishment_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        category_id: 1,
        establishment_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        category_id: 2,
        establishment_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('establishment_category', null, {});
  }
};
