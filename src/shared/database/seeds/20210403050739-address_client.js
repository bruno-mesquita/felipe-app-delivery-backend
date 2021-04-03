'use strict';

const { hashSync } = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('address_client', [
      {
        id: 1,
        client_id: 1,
	      nickname: 'Meu endereço',
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
        client_id: 2,
	      nickname: 'Meu endereço',
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
    await queryInterface.bulkDelete('address_client', null, {});
  }
};
