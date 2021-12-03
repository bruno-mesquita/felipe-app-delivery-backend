import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { accessEstablishmentOwner } from '@shared/middlewares/access-establishment-owner';

import NotificationController from './notifications.controller';

const routes = Router();
const notificationController = new NotificationController();

routes.post('/notifications/register', ...[isAuthenticated, accessEstablishmentOwner], notificationController.register);

export default routes;
