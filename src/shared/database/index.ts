import { Sequelize } from 'sequelize';

import sequelizeConfig from './sequelizeConfig';
import models from './models';

class Database {
  private sequelize: Sequelize;

  public async init() {
    await this.sequelizeInit();
  }

  private async sequelizeInit(): Promise<void> {
    try {
      this.sequelize = new Sequelize(sequelizeConfig);

      await this.sequelize.authenticate();
      this.initModels();
    } catch (err) {
      console.log('Erro ao se conectar ao database');
    }
  }

  private initModels() {
    models
      .map((model: any) => model.start(this.sequelize))
      .map(
        (model) => model.associate && model.associate(this.sequelize.models)
      );
  }

  public async disconnect() {
    await this.sequelize.close();
  }
}

export default Database;
