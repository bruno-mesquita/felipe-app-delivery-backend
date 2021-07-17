import { QueryInterface } from 'sequelize';
import { hashSync } from 'bcryptjs';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('clients', [
      {
        id: 1,
        name: "Bruno",
	      email: "bruno@gmail.com",
	      cellphone: "12981315531",
	      password: hashSync('senhaforte', 8),
	      cpf: "00300730420",
        active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        name: "Jonatas",
	      email: "jonatas@gmail.com",
	      cellphone: "12981315531",
	      password: hashSync('senhaforte', 8),
	      cpf: "00300730421",
        active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});

  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('clients', null, {});
  }
};
