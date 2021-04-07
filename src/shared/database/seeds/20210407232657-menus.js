'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('menus', [
      {
        id: 1,
	      name: 'Bebidas',
	      establishment_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
	      name: 'Pizzas',
	      establishment_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
	      name: 'Pizzas doces',
	      establishment_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
	      name: 'Lanches',
	      establishment_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 5,
	      name: 'Bebidas',
	      establishment_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 6,
	      name: 'Pizzas',
	      establishment_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 7,
	      name: 'Pizzas doces',
	      establishment_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 8,
	      name: 'Lanches',
	      establishment_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('menus', null, {});
  }
};
