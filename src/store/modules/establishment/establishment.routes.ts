import { Router } from 'express';

import { EstabishmentController  } from './establishment.controller';
import isAuthenticated from '@shared/middlewares/is-authenticated';

const routes = Router();
const estabishmentController = new EstabishmentController();

routes.post('/establisments/me', isAuthenticated, estabishmentController.profile);
routes.put('/establisments', isAuthenticated, estabishmentController.updateProfile);
routes.put('/establisments/deactive', isAuthenticated, estabishmentController.deactiveAccount);
routes.post('/establisments', isAuthenticated, estabishmentController.create);

export default routes;
