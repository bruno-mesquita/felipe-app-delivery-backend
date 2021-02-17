/**

 * @fileoverview cadastrando rotas do estabelecimento

 *

 * @author Jonatas Rosa Moura

 */

import { Router } from 'express';

import EstablishmentController from './controllers/EstablishmentAdminController';

const routerEstablishment = Router();

const establishmentController = new EstablishmentController();

routerEstablishment.post('/', establishmentController.create);

export default routerEstablishment;
