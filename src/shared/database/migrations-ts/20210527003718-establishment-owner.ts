import { QueryInterface, DataTypes } from 'sequelize';
import security from '@shared/utils/security-js';

export default {
  up: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    await queryInterface.createTable('establishment-owners', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
          return security.decrypt(this.getDataValue('first_name'));
        },
        set(value) {
          this.setDataValue('first_name', security.encrypt(value))
        }
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
          return security.decrypt(this.getDataValue('last_name'));
        },
        set(value) {
          this.setDataValue('last_name', security.encrypt(value))
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
      establishment_id: {
        type: Sequelize.INTEGER,
        references: { model: 'establishments', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('establishment-owners');
  }
};
