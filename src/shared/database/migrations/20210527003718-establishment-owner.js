"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _securityJs = _interopRequireDefault(require("../../utils/security-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('establishment-owners', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,

        get() {
          return _securityJs.default.decrypt(this.getDataValue('first_name'));
        },

        set(value) {
          this.setDataValue('first_name', _securityJs.default.encrypt(value));
        }

      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,

        get() {
          return _securityJs.default.decrypt(this.getDataValue('last_name'));
        },

        set(value) {
          this.setDataValue('last_name', _securityJs.default.encrypt(value));
        }

      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,

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
      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,

        get() {
          return _securityJs.default.decrypt(this.getDataValue('cpf'));
        },

        set(value) {
          this.setDataValue('cpf', _securityJs.default.encrypt(value));
        }

      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      establishment_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'establishments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true
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
    await queryInterface.dropTable('establishment-owners');
  }
};
exports.default = _default;