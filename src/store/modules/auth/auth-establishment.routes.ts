/**
 * @fileoverview Criação de rota de login de estabelecimento
 *
 * @author Jonatas Rosa Moura
 */

import { Router } from 'express';

import { AuthEstablishmentController } from './auth-login-controller';

export const authEstablishmentRoutes = Router();
const authEstablishmentController = new AuthEstablishmentController();

authEstablishmentRoutes.post('/', authEstablishmentController.login);
