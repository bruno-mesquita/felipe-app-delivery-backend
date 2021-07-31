"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = require("bcryptjs");

var _default = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('clients', [{
      id: 1,
      name: "Bruno",
      email: "bruno@gmail.com",
      cellphone: "12981315531",
      password: (0, _bcryptjs.hashSync)('senhaforte', 8),
      cpf: "00300730420",
      active: true,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      id: 2,
      name: "Jonatas",
      email: "jonatas@gmail.com",
      cellphone: "12981315531",
      password: (0, _bcryptjs.hashSync)('senhaforte', 8),
      cpf: "00300730421",
      active: true,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },
  down: async queryInterface => {
    await queryInterface.bulkDelete('clients', null, {});
  }
};
exports.default = _default;