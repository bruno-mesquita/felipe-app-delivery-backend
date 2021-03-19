import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { ClientAddressController } from './ClientAddressController';

const clientAddressController = new ClientAddressController();

const clientAddressRoutes = Router();

clientAddressRoutes.use(isAuthenticated);
clientAddressRoutes.post('/adresses-client', clientAddressController.create);

export { clientAddressRoutes };
