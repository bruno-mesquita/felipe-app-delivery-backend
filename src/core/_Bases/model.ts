import { Model as SequelizeModel } from 'sequelize';

abstract class Model extends SequelizeModel {
  readonly id!: number;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
  deletedAt!: Date;
}

export default Model;
