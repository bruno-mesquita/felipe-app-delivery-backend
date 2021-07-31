"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('address_client', [{
      id: 1,
      client_id: 1,
      nickname: 'Meu endereço',
      street: 'Não informado',
      number: 'Não informado',
      neighborhood: 'Não informado',
      cep: 'Não informado',
      active: true,
      city_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null
    }, {
      id: 2,
      client_id: 2,
      nickname: 'Meu endereço',
      street: 'Não informado',
      number: 'Não informado',
      neighborhood: 'Não informado',
      cep: 'Não informado',
      active: true,
      city_id: 3,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null
    }], {});
  },
  down: async queryInterface => {
    await queryInterface.bulkDelete('address_client', null, {});
  }
};
exports.default = _default;