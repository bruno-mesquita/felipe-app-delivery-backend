import { Router } from 'express';

import middlewares from '@admin/http/middlewares';
import {AddressEstablishmentController} from './address-controller';

const addressEstablishmentController = new AddressEstablishmentController();

const addressEstablishmentRoutes = Router();

addressEstablishmentRoutes.get('/state/:id', ...middlewares, addressEstablishmentController.listCitiesByState);

export { addressEstablishmentRoutes };
