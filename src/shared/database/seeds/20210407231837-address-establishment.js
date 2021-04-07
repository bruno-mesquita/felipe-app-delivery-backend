'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('address_establishment', [
      {
        id: 1,
	      street: 'Não informado',
	      number: 'Não informado',
	      neighborhood: 'Não informado',
	      cep: 'Não informado',
	      city_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
	      street: 'Não informado',
	      number: 'Não informado',
	      neighborhood: 'Não informado',
	      cep: 'Não informado',
	      city_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('address_establishment', null, {});
  }
};
