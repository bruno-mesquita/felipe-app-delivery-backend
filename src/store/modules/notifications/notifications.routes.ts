import { Router } from 'express';

import middlewares from '@store/http/middlewares';

import NotificationController from './notifications.controller';

const routes = Router();
const notificationController = new NotificationController();

routes.post('/notifications/register', ...middlewares, notificationController.register);

export default routes;
