import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { BoletoController } from './boleto.controller';

const routes = Router();
const boletoController = new BoletoController();

routes.get('/tickets', isAuthenticated, boletoController.list);

export default routes;
