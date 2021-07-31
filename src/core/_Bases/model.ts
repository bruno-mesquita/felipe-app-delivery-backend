import { Model as SequelizeModel } from 'sequelize';

abstract class Model extends SequelizeModel {
  readonly id!: number;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
  deletedAt!: Date;

  public async toRemove() {
    Object.entries(Object.assign({}, this.toJSON())).map(field => {
      const [key, fieldValue] = field;
      let value = fieldValue;

      if(typeof fieldValue === 'string') value = 'Registro apagado';
      else if (typeof fieldValue === 'number' && key !== 'id') value = 0;

      this[key] = value;
    });

    await this.destroy();
  }
}

export default Model;
