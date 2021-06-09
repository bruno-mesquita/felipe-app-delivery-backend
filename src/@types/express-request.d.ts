import Admin from '@core/admin';
import { EstablishmentOwner } from '@core/establishment-owner';
import User from '@core/_Bases/user';
import { Request } from 'express';

declare global {
  // eslint-disable-next-line no-shadow
  namespace Express {
    // eslint-disable-next-line no-shadow
    interface Request {
      client: {
        id: number;
        entity: User & EstablishmentOwner & Admin;
      };
    }
  }
}

export {};
