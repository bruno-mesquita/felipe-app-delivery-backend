'use strict';

const { hashSync } = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('admins', [
      {
        id: 1,
        name: "Felipe",
	      email: "felipe@gmail.com",
	      cellphone: "12981315531",
	      password: hashSync('senhaforte', 8),
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('admins', null, {});
  }
};
