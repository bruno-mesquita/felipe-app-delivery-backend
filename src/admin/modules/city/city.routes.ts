
import { Router } from 'express';
import { CityController } from './city.controller';

const cityController = new CityController();

const routes = Router();

routes.post('/cities', cityController.create);
routes.put('/cities/:id', cityController.update);


export default routes;
