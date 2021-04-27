import { Router } from 'express';

import { EstabishmentController  } from './establishment.controller';

const routes = Router();
const estabishmentController = new EstabishmentController();

routes.put('/establisments/update-password', estabishmentController.updatePassword);
routes.post('/establisments/me', estabishmentController.profile);
routes.put('/establisments', estabishmentController.updateProfile);

export default routes;
