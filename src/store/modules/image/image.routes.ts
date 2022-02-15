import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated'
import { ImageEstablishmentController } from './image-controller';

const imageEstablishmentController = new ImageEstablishmentController();

const imagesRoutes = Router();

imagesRoutes.put('/image', isAuthenticated, imageEstablishmentController.update);

export { imagesRoutes }
