import { Sequelize, DataTypes } from "sequelize/types";

import Model from "@core/_Bases/model";

class TermsOfUse extends Model {
  description: string;

  static start(sequelize: Sequelize) {
    this.init({
      description: DataTypes.STRING,
    }, { sequelize, tableName: 'terms-of-use' });

    return this;
  }

  public setName(description: string): void {
    this.description = description;
  }
}

export default TermsOfUse;
