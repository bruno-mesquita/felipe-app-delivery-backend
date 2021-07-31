"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('states', [{
      id: 1,
      name: 'São Paulo',
      active: true,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      id: 2,
      name: 'Minas Gerais',
      active: true,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },
  down: async queryInterface => {
    await queryInterface.bulkDelete('states', null, {});
  }
};
exports.default = _default;