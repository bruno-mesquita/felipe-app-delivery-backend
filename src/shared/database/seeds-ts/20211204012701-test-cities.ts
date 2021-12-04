import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('city', [{
      name: 'São José dos Campos',
      active: true,
      state_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('city', null, {});
  }
};
