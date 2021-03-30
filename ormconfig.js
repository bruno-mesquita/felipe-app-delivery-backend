const { DB_DATABASE, DB_HOST, DB_PASS, DB_PORT, DB_TYPE, DB_USER, NODE_ENV } = process.env;

const ROOT_DIR = NODE_ENV !== 'prod' ? 'src' : 'dist';
const EXT = NODE_ENV !== 'prod' ? 'ts' : 'js';

module.exports = {
  type: DB_TYPE,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASS,
  database: DB_DATABASE,
  synchronize: true,
  logging: false,

  entities: [`./${ROOT_DIR}/core/**/*.${EXT}`],
  migrations: [`./${ROOT_DIR}/shared/typeorm/migrations/*.${EXT}`],
  subscribers: [`${ROOT_DIR}/subscriber/**/*.${EXT}`],
  cli: {
    migrationsDir: `./${ROOT_DIR}/shared/typeorm/migrations`,
    entitiesDir: `./${ROOT_DIR}/core`,
    subscribersDir: `${ROOT_DIR}/subscriber`,
  },
};
