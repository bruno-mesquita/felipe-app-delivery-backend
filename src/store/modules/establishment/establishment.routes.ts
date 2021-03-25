import { Router } from 'express';
import { ImageController } from './controllers/image-controller';

const imageController = new ImageController();

const establishmentRoutes = Router();

establishmentRoutes.post('/profile', imageController.create);

export { establishmentRoutes };
