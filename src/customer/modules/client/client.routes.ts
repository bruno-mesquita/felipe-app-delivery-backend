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

routes.put('/', clientController.updateProfile);

routes.put('/update-password', clientController.updatePassword);

export default routes;
