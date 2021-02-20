/**
 * @fileoverview Criação de rota de login de estabelecimento
 *
 * @author Jonatas Rosa Moura
 */

import { Router } from 'express';

import { AuthEstablishmentController } from './auth-login-controller';

const authEstablishmentRoutes = Router();
const authEstablishmentController = new AuthEstablishmentController();

authEstablishmentRoutes.post('/login', authEstablishmentController.login);

export default authEstablishmentRoutes;
