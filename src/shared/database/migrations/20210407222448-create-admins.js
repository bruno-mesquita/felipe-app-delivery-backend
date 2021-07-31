"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _securityJs = _interopRequireDefault(require("../../utils/security-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('admins', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,

        get() {
          return _securityJs.default.decrypt(this.getDataValue('name'));
        },

        set(value) {
          this.setDataValue('name', _securityJs.default.encrypt(value));
        }

      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,

        get() {
          return _securityJs.default.decrypt(this.getDataValue('email'));
        },

        set(value) {
          this.setDataValue('email', _securityJs.default.encrypt(value));
        }

      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cellphone: {
        type: Sequelize.STRING,
        allowNull: false,

        get() {
          return _securityJs.default.decrypt(this.getDataValue('cellphone'));
        },

        set(value) {
          this.setDataValue('cellphone', _securityJs.default.encrypt(value));
        }

      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('admins');
  }
};
exports.default = _default;