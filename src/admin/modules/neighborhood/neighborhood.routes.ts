import { Router } from 'express';

import { NeighborhoodController } from './neighborhood.controller';

const routes = Router();
const neighborhoodController = new NeighborhoodController();

routes.post('/neighborhoods', neighborhoodController.create);
routes.put('/neighborhoods/:id', neighborhoodController.update);
routes.delete('/neighborhoods/:id', neighborhoodController.destroy);

export default routes;
