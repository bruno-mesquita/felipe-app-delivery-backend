import { Router } from 'express';

import { ClientAddressController } from './controllers/ClientAddressController';

const clientAddressController = new ClientAddressController();

const clientAddressRoutes = Router();

clientAddressRoutes.post('/addressClient', clientAddressController.create);

export { clientAddressRoutes };
