import { Router } from 'express';

import middlewares from '@admin/http/middlewares';

import { AnnouncementController } from './announcement-controller';

const announcementController = new AnnouncementController();

const announcementRoutes = Router();

announcementRoutes.post(
  '/announcement',
  ...middlewares,
  announcementController.create
);
announcementRoutes.get(
  '/announcement/:id',
  ...middlewares,
  announcementController.show
);
announcementRoutes.get(
  '/announcement',
  ...middlewares,
  announcementController.list
);
announcementRoutes.put(
  '/announcement/:id',
  ...middlewares,
  announcementController.update
);
announcementRoutes.delete(
  '/announcement/:id',
  ...middlewares,
  announcementController.delete
);

export { announcementRoutes };
