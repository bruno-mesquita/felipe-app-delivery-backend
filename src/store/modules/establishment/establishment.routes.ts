import { Router } from 'express';

import { EstabishmentController  } from './establishment.controller';
import isAuthenticated from '@shared/middlewares/is-authenticated';

const routes = Router();
const estabishmentController = new EstabishmentController();

routes.post('/establishments/me', isAuthenticated, estabishmentController.profile);
routes.put('/establishments', isAuthenticated, estabishmentController.updateProfile);
routes.put('/establishments/deactive', isAuthenticated, estabishmentController.deactiveAccount);
routes.post('/establishments', isAuthenticated, estabishmentController.create);
routes.get('/establishments/exists', isAuthenticated, estabishmentController.exists);

export default routes;
