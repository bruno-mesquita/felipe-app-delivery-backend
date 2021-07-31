"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('cities', [{
      id: 1,
      name: 'São José dos Campos',
      state_id: 1,
      active: true,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      id: 2,
      name: 'São Paulo',
      state_id: 1,
      active: true,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      id: 3,
      name: 'São Sebastião',
      state_id: 1,
      active: true,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      id: 4,
      name: 'Belo Horizonte',
      state_id: 2,
      active: true,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },
  down: async queryInterface => {
    await queryInterface.bulkDelete('cities', null, {});
  }
};
exports.default = _default;