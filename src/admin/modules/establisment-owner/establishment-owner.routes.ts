import { Router } from 'express';

import { EstablishmentOwnerController } from './establishment-owner.controller';

const routes = Router();
const establishmentOwnerController = new EstablishmentOwnerController();

routes.post('/establishment-owners', establishmentOwnerController.create);

export default routes;
