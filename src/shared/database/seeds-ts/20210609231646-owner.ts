import { QueryInterface } from 'sequelize';
import { hashSync } from 'bcryptjs';

export default {
  up: async (queryInterface: QueryInterface) => {
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

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('establishment-owners', null, {});
  }
};
