import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { accessClient } from '@shared/middlewares/access-client';

import clientController from './client.controller';

const routes = Router();

const middlewares = [isAuthenticated, accessClient];

routes.post('/clients', clientController.create);
routes.put('/clients/activate', clientController.activate);
routes.put('/clients', ...middlewares, clientController.updateProfile);
routes.put(
  '/clients/update-password',
  ...middlewares,
  clientController.updatePassword
);
routes.get(
  '/clients/orders',
  ...middlewares,
  clientController.listOrdersByClient
);
routes.post('/clients/me', ...middlewares, clientController.profile);
routes.get('/clients/me', ...middlewares, clientController.me);
routes.delete('/clients', ...middlewares, clientController.remove);
routes.put('/clients/deactivate', ...middlewares, clientController.deactivate);

export default routes;
