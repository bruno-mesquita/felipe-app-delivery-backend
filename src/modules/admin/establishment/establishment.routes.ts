/**

 * @fileoverview cadastrando rotas do estabelecimento

 *

 * @author Jonatas Rosa Moura

 */

import { Router } from 'express';

import EstablishmentController from './controllers/EstablishmentAdminController';

const establishmentRouter = Router();
const establishmentController = new EstablishmentController();

establishmentRouter.post('/', establishmentController.create);

export default establishmentRouter;
