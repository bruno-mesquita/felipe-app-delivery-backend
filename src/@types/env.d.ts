import { Dialect } from 'sequelize';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'dev' | 'prod' | 'test';

      API_PORT: number;

      JWT_PASS: string;
      JWT_EXPIRES: string;

      DB_TYPE: Dialect;
      DB_PASS: string;
      DB_USER: string;
      DB_HOST: string;
      DB_PORT: number;
      DB_DATABASE: string;

      ENCRYPTION_KEY: string;
    }
  }
}

export {};
