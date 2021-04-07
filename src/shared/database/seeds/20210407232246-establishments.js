'use strict';

const { hashSync } = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('establishments', [
      {
        id: 1,
        name: "Bar do Bruno",
	      email: "bruno_bar@gmail.com",
	      password: hashSync('senhaforte', 8),
	      cellphone: "12981315331",
        opening_time: 17,
        closing_time: 23,
        freight_value: 3.50,
        active: true,
        image_id: 3,
        address_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        name: "Raio de Luz",
	      email: "raio_luz@gmail.com",
	      cellphone: "12981515531",
	      password: hashSync('senhaforte', 8),
        address_id: 2,
        active: true,
        opening_time: 18,
        closing_time: 4,
        active: true,
        freight_value: 4.50,
        image_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('establishments', null, {});
  }
};
