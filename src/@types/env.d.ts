declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_CLIENT_PORT: number;
      API_ADMIN_PORT: number;
      API_STORE_PORT: number;

      JWT_PASS: string;
      JWT_EXPIRES: string;
    }
  }
}

export {};
