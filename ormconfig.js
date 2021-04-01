const path = require('path');

const {
  TYPEORM_DATABASE,
  TYPEORM_HOST,
  TYPEORM_PASSWORD,
  TYPEORM_PORT,
  TYPEORM_CONNECTION,
  TYPEORM_USERNAME,
} = process.env;
const isCompiled = path.extname(__filename).includes('js');

const root = isCompiled ? 'src' : 'dist';
const ext = isCompiled ? 'js' : 'ts';

module.exports = {
  type: TYPEORM_CONNECTION,
  host: TYPEORM_HOST,
  port: TYPEORM_PORT,
  username: TYPEORM_USERNAME,
  password: TYPEORM_PASSWORD,
  database: TYPEORM_DATABASE,
  synchronize: true,
  logging: false,

  entities: [`./${root}/core/**/*.${ext}`],
  migrations: [`./${root}/shared/typeorm/migrations.${ext}`],
  subscribers: [`./${root}/subscriber/**/*.${ext}`],
  cli: {
    migrationsDir: `${root}/shared/typeorm/migrations`,
    entitiesDir: `${root}/core`,
    subscribersDir: `${root}/subscriber`,
  },
};
