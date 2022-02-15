import { Router } from 'express';

import middlewares from '@admin/http/middlewares';
import { EstablishmentOwnerController } from './establishment-owner.controller';

const routes = Router();
const establishmentOwnerController = new EstablishmentOwnerController();

routes.post('/establishment-owners', ...middlewares, establishmentOwnerController.create);
routes.get('/establishment-owners', ...middlewares, establishmentOwnerController.list);
routes.get('/establishment-owners/:id', ...middlewares, establishmentOwnerController.show);

export default routes;
