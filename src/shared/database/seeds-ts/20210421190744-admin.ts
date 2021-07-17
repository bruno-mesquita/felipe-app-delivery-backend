import { QueryInterface } from 'sequelize';
import { hashSync } from 'bcryptjs';

export default {
  up: async (queryInterface: QueryInterface) => {
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

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('admins', null, {});
  }
};
