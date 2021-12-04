import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('state', [{
    id: 1,
    name: 'São Paulo',
    active: true,
    created_at: new Date(),
    updated_at: new Date(),
    }], {});
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('state', null, {});
  }
};
