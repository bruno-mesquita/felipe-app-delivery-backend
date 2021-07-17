import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('categories', [
      {
        name: 'Lanchonetes',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Pizzarias',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Restaurantes',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Mercados',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Lojas',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Farmácias',
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});

  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
