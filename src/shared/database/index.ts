import Sequelize from 'sequelize';

import { databaseConfig } from './config';

class Database {
  public connection: Sequelize.Sequelize;

  constructor() {
    this.init();
  }

  init(): void {
    this.connection = new Sequelize.Sequelize(databaseConfig);
  }
}

const database: Database = new Database();

export default database;
