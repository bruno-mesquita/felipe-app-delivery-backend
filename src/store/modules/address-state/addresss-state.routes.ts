import { Router } from 'express';

import { AddressStateController } from './address-state.controller';

const routes = Router();
const addressStateController = new AddressStateController();

routes.get('/states', addressStateController.listState);
routes.get('/cities/:state_id', addressStateController.listCitiesByState);

export default routes;
