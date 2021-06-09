'use strict';

const { hashSync } = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('establishment-owners', [
      {
        first_name: "Felipe",
	      last_name: "Smith",
	      email: "felipe@gmail.com",
	      password: hashSync('senhaforte', 8),
        cellphone: "12981315531",
        active: true,
        cpf: "45678912355",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        first_name: "Bruno",
	      last_name: "Mesquita",
	      email: "bruno@gmail.com",
	      password: hashSync('senhaforte', 8),
        cellphone: "12981315532",
        active: true,
        cpf: "45678912356",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        first_name: "Jonatas",
	      last_name: "Moura",
	      email: "jonatas@gmail.com",
	      password: hashSync('senhaforte', 8),
        cellphone: "12981315533",
        active: true,
        cpf: "45678912357",
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('establishment-owners', null, {});
  }
};
