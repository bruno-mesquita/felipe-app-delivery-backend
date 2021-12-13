import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { accessClient } from '@shared/middlewares/access-client';

import ClientAddressController from './client-address.controller';

const routes = Router();
const clientAddressController = new ClientAddressController();

const middlewares = [isAuthenticated, accessClient];

routes.get('/adresses-client', [...middlewares], clientAddressController.list);
routes.get('/adresses-client/:id', [...middlewares], clientAddressController.findOne);
routes.post('/adresses-client', [...middlewares], clientAddressController.create);
routes.put('/adresses-client/:id', [...middlewares], clientAddressController.update);
routes.delete('/adresses-client/:addressClientId', [...middlewares], clientAddressController.delete);

export default routes;
