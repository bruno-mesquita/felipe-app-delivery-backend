import { Router } from 'express';

import { AddressEstablishmentController } from './address-controller';

const addressEstablishmentController = new AddressEstablishmentController();

const addressRoutes = Router();

addressRoutes.put('/establishments/:id', addressEstablishmentController.update);

export { addressRoutes }
