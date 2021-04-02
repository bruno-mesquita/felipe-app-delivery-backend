import 'dotenv/config';

export const databaseConfig = {
  dialect: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  define: {
    timestamps: true,
  },
};
