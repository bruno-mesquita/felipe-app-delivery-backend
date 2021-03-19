/**
 * @fileoverview cadastrando rotas do estado e cidade
 *
 * @author Jonatas Rosa Moura
 */

import { Router } from 'express';

import { AddressController } from './AddressController';

const addressController = new AddressController();

const addressRoutes = Router();

// Estado
addressRoutes.get('/states', addressController.listState);
addressRoutes.get('/state/:state_id', addressController.listCitiesByState);

export { addressRoutes };
