import { Sequelize } from 'sequelize';

import databaseConfig from './config';
import models from './models';

class Database {
  public connection: Sequelize;

  constructor() {
    this.init().then(() => {
      this.initModels();
    });
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
    models.map((model: any) => model.start(this.connection)).map(model => model.associate && model.associate(this.connection.models))
  }
}

export default new Database();
