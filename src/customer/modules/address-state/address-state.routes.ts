/**
 * @fileoverview cadastrando rotas do estado e cidade
 *
 * @author Jonatas Rosa Moura
 */

import { Router } from 'express';

import { AddressStateController } from './address-state.controller';

const addressStateController = new AddressStateController();

const addressStateRoutes = Router();

// Estado
addressStateRoutes.get('/states', addressStateController.listState);
addressStateRoutes.get('/state/:state_id', addressStateController.listCitiesByState);

export { addressStateRoutes };
