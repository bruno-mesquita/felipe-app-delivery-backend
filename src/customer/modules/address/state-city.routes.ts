/**
 * @fileoverview cadastrando rotas do estado e cidade
 *
 * @author Jonatas Rosa Moura
 */

import { Router } from 'express';

import { CityController } from './controllers/CityController';
import { StateController } from './controllers/StateController';

const stateController = new StateController();
const cityController = new CityController();

const stateRoutes = Router();

// Estado
stateRoutes.post('/state', stateController.create);

// Cidade
stateRoutes.post('/city', cityController.create);

export { stateRoutes };
