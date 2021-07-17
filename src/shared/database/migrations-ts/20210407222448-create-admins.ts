import { QueryInterface, DataTypes } from 'sequelize';

import security from '@shared/utils/security-js';

export default {
  up: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    await queryInterface.createTable('admins', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
          return security.decrypt(this.getDataValue('name'));
        },
        set(value) {
          this.setDataValue('name', security.encrypt(value))
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
          return security.decrypt(this.getDataValue('email'));
        },
        set(value) {
          this.setDataValue('email', security.encrypt(value))
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cellphone: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
          return security.decrypt(this.getDataValue('cellphone'));
        },
        set(value) {
          this.setDataValue('cellphone', security.encrypt(value))
        }
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('admins');
  }
};
