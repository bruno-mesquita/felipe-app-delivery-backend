import { ConnectionOptions } from 'typeorm';
import path from 'path';

const { DB_DATABASE, DB_HOST, DB_PASS, DB_PORT, DB_TYPE, DB_USER } = process.env;
const isCompiled = path.extname(__filename).includes('js');

const root = isCompiled ? 'dist' : 'src';
const ext = isCompiled ? 'js' : 'ts';

export default {
  type: DB_TYPE,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASS,
  database: DB_DATABASE,
  synchronize: true,
  logging: false,

  entities: [`./${root}/core/**/*.${ext}`],
  migrations: [`./${root}/shared/typeorm/migrations/*.${ext}`],
  subscribers: [`${root}/subscriber/**/*.${ext}`],
  cli: {
    migrationsDir: `./${root}/shared/typeorm/migrations`,
    entitiesDir: `./${root}/core`,
    subscribersDir: `${root}/subscriber`,
  },
} as ConnectionOptions;
