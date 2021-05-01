import { Router } from 'express';

import { ImageEstablishmentController } from './image-controller';

const imageEstablishmentController = new ImageEstablishmentController();

const imagesRoutes = Router();

imagesRoutes.put('/image', imageEstablishmentController.update);

export { imagesRoutes }
