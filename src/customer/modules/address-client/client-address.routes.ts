import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { ClientAddressController } from './ClientAddressController';

const clientAddressController = new ClientAddressController();

const clientAddressRoutes = Router();

clientAddressRoutes.use(isAuthenticated);
clientAddressRoutes.get('/adresses-client', clientAddressController.list);
clientAddressRoutes.post('/adresses-client', clientAddressController.create);
clientAddressRoutes.put('/adresses-client/:id', clientAddressController.update);
clientAddressRoutes.delete('/adresses-client/:id', clientAddressController.delete);

export { clientAddressRoutes };
