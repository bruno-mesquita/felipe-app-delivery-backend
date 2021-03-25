import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { AvatarController } from './avatar-controller';

const avatarController = new AvatarController();

const avatarRoutes = Router();

avatarRoutes.use(isAuthenticated);
avatarRoutes.post('/avatar', avatarController.create);

export { avatarRoutes };
