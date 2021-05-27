import { Router } from 'express';

import { OwnerController } from './owner.controller';

const routes = Router();
const ownerController = new OwnerController();

routes.put('/owners/change-password', ownerController.updatePassword);

export default routes;
