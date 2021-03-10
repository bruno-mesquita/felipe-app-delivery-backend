/**
 * @fileoverview cadastrando rotas do estado e cidade
 *
 * @author Jonatas Rosa Moura
 */

import { Router } from 'express';

import { AddressController } from './controllers/AddressController';

const addressController = new AddressController();

const clientAddressRoutes = Router();

// Endereço
clientAddressRoutes.post('/addressClient', addressController.create);

export { clientAddressRoutes };
