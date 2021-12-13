import { Dialect } from 'sequelize';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';

      API_PORT: number;
      PORT_AGIOTA: number;

      JWT_PASS: string;
      JWT_EXPIRES: string;
      JWT_REFRESH_EXPIRES: string;

      DB_TYPE: Dialect;
      DB_PASS: string;
      DB_USER: string;
      DB_HOST: string;
      DB_PORT: number;
      DB_DATABASE: string;

      SECURITY_ALGORITHM: string;
      SECURITY_KEY: string;

      SMS_KEY: string;
      SMS_API_URL: string;

      API_NOTIFCATIONS: string;
    }
  }
}

export {};
