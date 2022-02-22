import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { OwnerController } from './owner.controller';

const routes = Router();
const ownerController = new OwnerController();

routes.put(
  '/owners/change-password',
  isAuthenticated,
  ownerController.updatePassword
);
routes.put('/owners', isAuthenticated, ownerController.updateOwner);
routes.post('/owners/me', isAuthenticated, ownerController.me);

export default routes;
