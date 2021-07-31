"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = require("bcryptjs");

var _default = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('admins', [{
      id: 1,
      name: "Felipe",
      email: "felipe@gmail.com",
      cellphone: "12981315531",
      password: (0, _bcryptjs.hashSync)('senhaforte', 8),
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },
  down: async queryInterface => {
    await queryInterface.bulkDelete('admins', null, {});
  }
};
exports.default = _default;