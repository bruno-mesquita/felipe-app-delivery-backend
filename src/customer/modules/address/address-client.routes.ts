/**
 * @fileoverview cadastrando rotas do estado e cidade
 *
 * @author Jonatas Rosa Moura
 */

import { Router } from 'express';

import { AddressController } from './controllers/AddressController';

const addressController = new AddressController();

const addressRoutes = Router();

// Estado
addressRoutes.get('/states', addressController.listState);
addressRoutes.get('/state/:state_id', addressController.listCitiesByState);

// Cidade
addressRoutes.get('/cities', addressController.listCities);

// Endereço
addressRoutes.post('/addressToClient', addressController.create);

export { addressRoutes };
