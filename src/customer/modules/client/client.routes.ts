/**
 * @fileoverview cadastrando rotas do cliente
 *
 * @author Bruno Mesquita
 */

import { Router } from 'express';

import ClientController from './client.controller';

const clientController = new ClientController();

const routes = Router();

routes.post('/', clientController.create);

routes.post('/activate', clientController.activate);

routes.put('/profile/:id', clientController.updateProfile);

routes.put('/update-password/:id', clientController.updatePassword);

export default routes;
