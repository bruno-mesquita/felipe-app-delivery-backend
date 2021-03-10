/**
 * @fileoverview cadastrando rotas do cliente
 *
 * @author Bruno Mesquita
 */

import isAuthenticated from '@shared/http/middlewares/is-authenticated';
import { Router } from 'express';
import { clientAddressRoutes } from '../address/address-client.routes';

import ClientController from './client.controller';

const clientController = new ClientController();

const routes = Router();

// routes.get('/', isAuthenticated, clientController.updatePassword);

routes.post('/', clientController.create);

routes.post('/activate', clientController.activate);

routes.put('/profile/:id', isAuthenticated, clientController.updateProfile);

routes.put('/update-password/:id', isAuthenticated, clientController.updatePassword);

// Endereço

routes.use('/address', clientAddressRoutes);

export default routes;
