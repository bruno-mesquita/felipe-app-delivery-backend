/**
 * @fileoverview cadastrando rotas do estabelecimento
 *
 * @author Jonatas Rosa Moura
 */

import { Router } from 'express';

import EstablishmentController from './controllers/EstablishmentAdminController';

const establishmentRouter = Router();
const establishmentController = new EstablishmentController();

establishmentRouter.post('/establishments', establishmentController.create);
establishmentRouter.get('/establishments/:id', establishmentController.show);
establishmentRouter.put('/establishments/:id', establishmentController.updateProfile);

export default establishmentRouter;
