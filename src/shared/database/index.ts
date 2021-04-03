import { Sequelize } from 'sequelize';

import { databaseConfig } from './config';
import models from './models';

class Database {
  public connection: Sequelize;

  constructor() {
    this.init();
    this.initModels();
  }

  private async init(): Promise<void> {
    this.connection = new Sequelize(databaseConfig);

    try {
      await this.connection.authenticate();
      console.log('Database conectado!');
    } catch (err) {
      console.log('Erro ao se conectar ao database');
    }
  }

  private initModels(): void {
    models.map((Model: any) => Model.start(this.connection))
  }
}

export default new Database();
