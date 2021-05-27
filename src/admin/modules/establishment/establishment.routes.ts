/**
 * @fileoverview cadastrando rotas do estabelecimento
 *
 * @author Jonatas Rosa Moura
 */

import { accessAdmin } from '@shared/middlewares/access-admin';
import isAuthenticated from '@shared/middlewares/is-authenticated';
import { Router } from 'express';

import EstablishmentController from './EstablishmentAdminController';

const establishmentRouter = Router();
const establishmentController = new EstablishmentController();

establishmentRouter.get('/establishments/:id', isAuthenticated, accessAdmin, establishmentController.show);
establishmentRouter.put('/establishments/:id', isAuthenticated, accessAdmin, establishmentController.updateProfile);
establishmentRouter.get('/establishments', isAuthenticated, accessAdmin, establishmentController.list);

export default establishmentRouter;
