/**
 * @fileoverview cadastrando rotas do estado e cidade
 *
 * @author Jonatas Rosa Moura
 */

import { Router } from 'express';

import { StateController } from './controllers/StateController';
import { CityController } from './controllers/CityController';
import { AddressController } from './controllers/AddressController';

const stateController = new StateController();
const cityController = new CityController();
const addressController = new AddressController();

const stateRoutes = Router();

// Estado
stateRoutes.post('/state', stateController.create);

// Cidade
stateRoutes.post('/city', cityController.create);

// Endereço
stateRoutes.post('/addressClient', addressController.create);

export { stateRoutes };
