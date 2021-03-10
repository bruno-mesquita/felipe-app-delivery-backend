/**
 * @fileoverview cadastrando rotas do estado
 *
 * @author Jonatas Rosa Moura
 */

import { Router } from 'express';

import { StateController } from './controllers/StateController';

const stateController = new StateController();

const stateRoutes = Router();

// Estado
stateRoutes.post('/state', stateController.create);

// Cidade
stateRoutes.post('/city', stateController.create);

export { stateRoutes };
