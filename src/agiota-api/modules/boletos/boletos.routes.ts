import { Router } from 'express';

import { BoletosController } from './boletos.controller';

const boletosController = new BoletosController();

const routes = Router();

routes.post('/tickets', boletosController.generateTicket);
routes.get('/tickets/:id', boletosController.verifyTicket);

export default routes;
