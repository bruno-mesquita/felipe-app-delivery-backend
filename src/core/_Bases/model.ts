import { Model as SequelizeModel } from 'sequelize';

abstract class Model<
  TModelAttributes extends {} = any,
  TCreationAttributes extends {} = TModelAttributes
> extends SequelizeModel<TModelAttributes, TCreationAttributes> {
  declare id: number;

  declare createdAt: Date;

  declare updatedAt: Date;

  declare deletedAt: Date;

  public async toRemove() {
    Object.entries({ ...this.toJSON() }).forEach((field) => {
      const [key, fieldValue] = field;
      let value = fieldValue;

      if (typeof fieldValue === 'string') value = 'Registro apagado';
      else if (typeof fieldValue === 'number' && key !== 'id') value = 0;

      this[key] = value;
    });

    await this.destroy();
  }

  public getId(): number {
    return this.get('id');
  }
}

export default Model;
