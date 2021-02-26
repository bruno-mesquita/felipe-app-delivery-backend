import { Router } from 'express';
import ClientsAdminController from './controllers/clients.controller';

const clientRouterAdmin = Router();
const clientAdminController = new ClientsAdminController();

clientRouterAdmin.get('/list', clientAdminController.list);

export { clientRouterAdmin };
