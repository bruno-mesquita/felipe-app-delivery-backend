"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('categories', [{
      name: 'Lanchonetes',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: 'Pizzarias',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: 'Restaurantes',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: 'Mercados',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: 'Lojas',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: 'Farmácias',
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },
  down: async queryInterface => {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
exports.default = _default;