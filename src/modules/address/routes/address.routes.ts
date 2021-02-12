import { create } from 'domain';
import { Router } from 'express';

import AddressController from '../controllers/AddressController';

const addressController = new AddressController();

const addressRouter = Router();

addressRouter.post('/', addressController.create);

export default addressRouter;
