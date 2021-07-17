import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('states', [
      {
        id: 1,
        name: 'São Paulo',
        active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        name: 'Minas Gerais',
        active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});

  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('states', null, {});
  }
};
