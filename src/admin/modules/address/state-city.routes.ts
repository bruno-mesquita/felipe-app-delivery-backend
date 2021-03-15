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

const stateCityRoutes = Router();

// Estado
stateCityRoutes.post('/state', stateController.create);
stateCityRoutes.get('/state', stateController.list);
stateCityRoutes.get('/state/:state_id', stateController.list);

// Cidade
stateCityRoutes.post('/city', cityController.create);
stateCityRoutes.get('/cities', cityController.list);

export { stateCityRoutes };
