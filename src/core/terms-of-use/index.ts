import { Sequelize, DataTypes } from 'sequelize';

import Model from '@core/_Bases/model';

class TermsOfUse extends Model {
  description: string;

  static start(sequelize: Sequelize) {
    this.init(
      {
        description: DataTypes.STRING,
      },
      { sequelize, tableName: 'terms-of-use' }
    );

    return this;
  }

  public setDescription(description: string): void {
    this.set('description', description);
  }
}

export default TermsOfUse;
