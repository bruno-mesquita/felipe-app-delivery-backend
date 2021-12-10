import { Router } from 'express';

const routes = Router();
import authController from './auth.controller';

routes.post('/auth/login', authController.login);
routes.post('/auth/refresh-token', authController.refreshToken);
routes.put('/auth/reset-password', authController.resetPassword);
routes.put('/auth/forgot-password', authController.forgotPassword);
routes.put('/auth/resend-code', authController.resendCode);

export default routes;
