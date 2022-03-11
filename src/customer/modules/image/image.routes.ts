import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { accessClient } from '@shared/middlewares/access-client';
import { ImageController } from './ImageController';

const routes = Router();
const imageController = new ImageController();

routes.get('/images/:id', ...[isAuthenticated, accessClient], imageController.findOne);

export default routes;
