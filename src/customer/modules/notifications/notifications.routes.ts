import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { accessClient } from '@shared/middlewares/access-client';

import NotificationController from './notifications.controller';

const routes = Router();
const notificationController = new NotificationController();



routes.post('/notifications/register', ...[isAuthenticated, accessClient], notificationController.register);

export default routes;
