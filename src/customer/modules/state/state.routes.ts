/**
 * @fileoverview cadastrando rotas do estado e cidade
 *
 * @author Jonatas Rosa Moura
 */

import { Router } from 'express';

import { AddressController } from './StateController';

const addressController = new AddressController();

const stateRoutes = Router();

// Estado
stateRoutes.get('/states', addressController.listState);
stateRoutes.get('/state/:state_id', addressController.listCitiesByState);

export { stateRoutes };
