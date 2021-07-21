import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { accessAdmin } from '@shared/middlewares/access-admin';
import { EstablishmentOwnerController } from './establishment-owner.controller';

const routes = Router();
const establishmentOwnerController = new EstablishmentOwnerController();

routes.post('/establishment-owners', isAuthenticated, accessAdmin, establishmentOwnerController.create);
routes.get('/establishment-owners', isAuthenticated, accessAdmin, establishmentOwnerController.list);
routes.get('/establishment-owners/:id', isAuthenticated, accessAdmin, establishmentOwnerController.show);

export default routes;
