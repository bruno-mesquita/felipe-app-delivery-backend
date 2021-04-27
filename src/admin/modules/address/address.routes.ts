import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import {AddressEstablishmentController} from './address-controller';

const addressEstablishmentController = new AddressEstablishmentController();

const addressEstablishmentRoutes = Router();

addressEstablishmentRoutes.get('/state/:id', isAuthenticated, addressEstablishmentController.listCitiesByState);

export { addressEstablishmentRoutes };
