import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { accessCityManager } from '@shared/middlewares/access-city-manager';
import { EstablishmentOwnerController } from './establishment-owner.controller';

const routes = Router();
const establishmentOwnerController = new EstablishmentOwnerController();

routes.post('/establishment-owners', isAuthenticated, accessCityManager, establishmentOwnerController.create);
routes.get('/establishment-owners', isAuthenticated, accessCityManager, establishmentOwnerController.list);
routes.get('/establishment-owners/:id', isAuthenticated, accessCityManager, establishmentOwnerController.show);

export default routes;
