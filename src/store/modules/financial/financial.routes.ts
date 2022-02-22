import { accessEstablishmentOwner } from '@shared/middlewares/access-establishment-owner';
import isAuthenticated from '@shared/middlewares/is-authenticated';
import { Router } from 'express';

import { FinancialController } from './financial-controllers';

const financialController = new FinancialController();

const routesFinancial = Router();

routesFinancial.get(
  '/generate-report',
  isAuthenticated,
  accessEstablishmentOwner,
  financialController.listRenatorio
);

export { routesFinancial };
