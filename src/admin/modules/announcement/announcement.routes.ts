import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { AnnouncementController } from './announcement-controller';
import { accessAdmin } from '@shared/middlewares/access-admin';

const announcementController = new AnnouncementController();

const announcementRoutes = Router();

announcementRoutes.post('/announcement', isAuthenticated, accessAdmin, announcementController.create);
announcementRoutes.get('/announcement/:id', isAuthenticated, accessAdmin, announcementController.show);
announcementRoutes.get('/announcement', isAuthenticated, accessAdmin, announcementController.list);
announcementRoutes.put('/announcement/:id', isAuthenticated, accessAdmin, announcementController.update);
announcementRoutes.delete('/announcement/:id', isAuthenticated, accessAdmin, announcementController.delete);

export { announcementRoutes };
