import { Router } from 'express';

import AuthController from './auth.controller';

const routes = Router();
const authController = new AuthController();

// Criar sessão do cliente

routes.post('/login', authController.login);

export default routes;
