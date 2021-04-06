'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('images', [
      {
        id: 1,
	      name: 'Meu endereço',
	      encoded: 'imagem',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
	      name: 'Meu endereço',
	      encoded: 'imagem',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('images', null, {});
  }
};
