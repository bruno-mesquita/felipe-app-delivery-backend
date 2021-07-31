"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = require("bcryptjs");

var _default = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('establishment-owners', [{
      first_name: "Felipe",
      last_name: "Smith",
      email: "felipe@gmail.com",
      password: (0, _bcryptjs.hashSync)('senhaforte', 8),
      cellphone: "12981315531",
      active: true,
      cpf: "45678912355",
      created_at: new Date(),
      updated_at: new Date()
    }, {
      first_name: "Bruno",
      last_name: "Mesquita",
      email: "bruno@gmail.com",
      password: (0, _bcryptjs.hashSync)('senhaforte', 8),
      cellphone: "12981315532",
      active: true,
      cpf: "45678912356",
      created_at: new Date(),
      updated_at: new Date()
    }, {
      first_name: "Jonatas",
      last_name: "Moura",
      email: "jonatas@gmail.com",
      password: (0, _bcryptjs.hashSync)('senhaforte', 8),
      cellphone: "12981315533",
      active: true,
      cpf: "45678912357",
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },
  down: async queryInterface => {
    await queryInterface.bulkDelete('establishment-owners', null, {});
  }
};
exports.default = _default;