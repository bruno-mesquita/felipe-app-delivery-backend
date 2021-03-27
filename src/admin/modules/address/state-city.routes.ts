/**
 * @fileoverview cadastrando rotas do estado e cidade
 *
 * @author Jonatas Rosa Moura
 */

import { Router } from 'express';
import { CityController } from './controllers/city-controller';
import { StateController } from './controllers/state-controller';

const stateController = new StateController();
const cityController = new CityController();

const stateCityRoutes = Router();

// Estado
stateCityRoutes.post('/state', stateController.create);

// Cidade
stateCityRoutes.post('/city', cityController.create);

stateCityRoutes.get('/states', stateController.listState);
stateCityRoutes.get('/state/:state_id', stateController.listCitiesByState);

export { stateCityRoutes };
