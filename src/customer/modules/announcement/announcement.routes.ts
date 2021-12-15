import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { accessClient } from '@shared/middlewares/access-client';

import AnnouncementController from './announcement.controller';

const routes = Router();
const announcementController = new AnnouncementController();

const middlewares = [isAuthenticated, accessClient];

routes.get('/announcements', ...middlewares, announcementController.list);

export default routes;
