import security from '@shared/utils/security-js';
import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    await queryInterface.createTable('clients', {
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
        unique: true,
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
      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        get() {
          return security.decrypt(this.getDataValue('cpf'));
        },
        set(value) {
          this.setDataValue('cpf', security.encrypt(value))
        }
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      avatar_id: {
        type: Sequelize.INTEGER,
        references: { model: 'images', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('clients');
  }
};
