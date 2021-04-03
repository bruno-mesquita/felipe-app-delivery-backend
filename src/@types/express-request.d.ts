import { Request } from 'express';

declare global {
  // eslint-disable-next-line no-shadow
  namespace Express {
    // eslint-disable-next-line no-shadow
    interface Request {
      client: {
        id: string;
      };
    }
  }
}

export {};
