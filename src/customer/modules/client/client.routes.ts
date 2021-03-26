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
routes.put('/clients', isAuthenticated, clientController.updateProfile);
routes.put('/clients/update-password', isAuthenticated, clientController.updatePassword);
routes.get('/clients/orders', isAuthenticated, clientController.listOrdersByClient);

export default routes;
