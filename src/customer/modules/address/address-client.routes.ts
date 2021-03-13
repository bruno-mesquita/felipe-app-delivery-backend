/**
 * @fileoverview cadastrando rotas do estado e cidade
 *
 * @author Jonatas Rosa Moura
 */

import { Router } from 'express';

import { AddressController } from './controllers/AddressController';

const addressController = new AddressController();

const addressRoutes = Router();

// Endereço
addressRoutes.post('/addressToClient', addressController.create);

export { addressRoutes };
