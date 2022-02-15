import { Router } from 'express';

import AuthController from './auth.controller';

const routes = Router();
const authController = new AuthController();


routes.post('/auth/login', authController.login);
routes.post('/auth/refresh-token', authController.refreshToken);
routes.put('/auth/reset-password', authController.resetPassword);
routes.put('/auth/forgot-password', authController.forgotPassword);
routes.put('/auth/resend-code', authController.resendCode);

export default routes;
