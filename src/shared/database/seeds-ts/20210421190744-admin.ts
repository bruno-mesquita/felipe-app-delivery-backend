import { QueryInterface } from 'sequelize';
import { hashSync } from 'bcryptjs';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('admin', [
      {
        id: 1,
        name: "Felipe",
	      email: "felipeflippdelivery@gmail.com",
	      cellphone: "12981315531",
	      password: hashSync('senhaforte/', 8),
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('admin', null, {});
  }
};
