import { Dialect } from 'sequelize';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'dev' | 'prod' | 'test';

      PORT: number;

      JWT_PASS: string;
      JWT_EXPIRES: string;
      JWT_REFRESH_EXPIRES: string;

      DB_TYPE: Dialect;
      DB_PASS: string;
      DB_USER: string;
      DB_HOST: string;
      DB_PORT: number;
      DB_DATABASE: string;

      ENCRYPTION_KEY: string;

      MERCADO_PAGO_KEY: string;
      MERCADO_PAGO_TOKEN: string;
    }
  }
}

export {};
