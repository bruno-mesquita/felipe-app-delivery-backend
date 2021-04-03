'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('cities', [
      {
        id: 1,
        name: 'São José dos Campos',
        state_id: 1,
        active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        name: 'São Paulo',
        state_id: 1,
        active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        name: 'São Sebastião',
        state_id: 1,
        active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        name: 'Belo Horizonte',
        state_id: 2,
        active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('cities', null, {});
  }
};
