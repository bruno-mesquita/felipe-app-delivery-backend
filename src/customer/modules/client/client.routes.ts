/**
 * @fileoverview cadastrando rotas do cliente
 *
 * @author Bruno Mesquita
 */

import { Router } from 'express';
import isAuthenticated from '@shared/middlewares/is-authenticated';

import ClientController from './client.controller';

const clientController = new ClientController();

const routes = Router();

routes.post('/clients', clientController.create);
routes.post('/clients/activate', clientController.activate);
routes.use(isAuthenticated);
routes.put('/clients', clientController.updateProfile);
routes.put('/clients/update-password', clientController.updatePassword);
routes.get('/clients/orders', clientController.listOrdersByClient);

export default routes;
