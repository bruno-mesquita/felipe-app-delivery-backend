import { Router } from 'express';

import AuthController from './auth.controller';

const authController = new AuthController();

const routes = Router();

routes.post('/auth/login', authController.login);
routes.post('/auth/refresh', authController.refresh);

export default routes;
