import { Sequelize } from 'sequelize';

import databaseConfig from './config';
import models from './models';

class Database {
  private connection: Sequelize;

  public async init(): Promise<void> {
    try {
      this.connection = new Sequelize(databaseConfig);

      await this.connection.authenticate();
      this.initModels();
    } catch (err) {
      console.log('Erro ao se conectar ao database');
    }
  }

  private initModels() {
    models.map((model: any) => model.start(this.connection)).map(model => model.associate && model.associate(this.connection.models))
  }

  public async disconnect() {
    await this.connection.close();
  }
}

export default Database;
