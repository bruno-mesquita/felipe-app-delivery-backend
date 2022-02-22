import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { accessEstablishmentOwner } from '@shared/middlewares/access-establishment-owner';
import { BoletoController } from './boleto.controller';

const routes = Router();
const boletoController = new BoletoController();
const middlewares = [isAuthenticated, accessEstablishmentOwner];

routes.get('/tickets', ...middlewares, boletoController.list);
routes.get('/tickets/:id/new', ...middlewares, boletoController.newBoleto);

export default routes;
