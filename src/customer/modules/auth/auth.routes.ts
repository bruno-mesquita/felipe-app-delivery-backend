import { Router } from 'express';

import { AuthController } from './auth.controller';

const routes = Router();
const authController = new AuthController();

routes.post('/auth/login', authController.login);

export default routes;
