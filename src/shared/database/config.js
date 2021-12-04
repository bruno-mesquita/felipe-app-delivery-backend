require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

/** @type {import('sequelize/types').Options} */
module.exports = {
  dialect: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  define: {
    timestamps: true,
    underscored: true,
  },
  logging: process.env.NODE_ENV === 'development',
};
