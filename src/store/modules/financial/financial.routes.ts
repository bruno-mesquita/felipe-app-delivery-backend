import { Router } from 'express';

import { FinancialController } from './financial-controllers';

const financialController = new FinancialController();

const routesFinancial = Router();

routesFinancial.get('/generate-report', financialController.listRenatorio);

export { routesFinancial };
