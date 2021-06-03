import { Router } from 'express';

import { BoletosController } from './boletos.controller';

const boletosController = new BoletosController();

const routes = Router();

routes.post('/generate-tickets', boletosController.generateTicket);
routes.get('/verify-tickets', boletosController.verifyTicket);
routes.get('/verify-tickets-expired', boletosController.checkExpiredBills);

export default routes;
