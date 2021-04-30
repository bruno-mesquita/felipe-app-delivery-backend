import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import {AddressEstablishmentController} from './address-controller';
import { accessAdmin } from '@shared/middlewares/access-admin';

const addressEstablishmentController = new AddressEstablishmentController();

const addressEstablishmentRoutes = Router();

addressEstablishmentRoutes.get('/state/:id', isAuthenticated, accessAdmin, addressEstablishmentController.listCitiesByState);

export { addressEstablishmentRoutes };
