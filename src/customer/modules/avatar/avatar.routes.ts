import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { accessClient } from '@shared/middlewares/access-client';

import AvatarController from './avatar.controller';

const routes = Router();
const avatarController = new AvatarController();

const middlewares = [isAuthenticated, accessClient];

routes.post('/avatar', ...middlewares, avatarController.create);
routes.get('/avatar', ...middlewares, avatarController.findOne);

export default routes;
