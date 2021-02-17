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
establishmentRouter.get('/:id', establishmentController.show);
establishmentRouter.get('/', establishmentController.list);
establishmentRouter.put('/:id', establishmentController.updateProfile);

export default establishmentRouter;
