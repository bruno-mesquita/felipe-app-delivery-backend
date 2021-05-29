import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { EstablishmentCategoriesController } from './establishment-categories.controller';

const routes = Router();
const establishmentCategoriesController = new EstablishmentCategoriesController();


routes.post('/establishments-categories/:categoryId', isAuthenticated, establishmentCategoriesController.add);
routes.delete('/establishments-categories/:categoryId', isAuthenticated, establishmentCategoriesController.remove);

export default routes;
