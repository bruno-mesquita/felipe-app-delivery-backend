declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_PORT: number;

      JWT_PASS: string;
      JWT_EXPIRES: string;
    }
  }
}

export {};
