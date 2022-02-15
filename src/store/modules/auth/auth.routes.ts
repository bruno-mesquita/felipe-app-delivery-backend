import { Router } from 'express';

import { AuthEstablishmentController } from './auth.controller';

const routes = Router();
const authEstablishmentController = new AuthEstablishmentController();

routes.post('/auth/login', authEstablishmentController.login);
routes.post('/auth/refresh', authEstablishmentController.refresh);

export default routes;
