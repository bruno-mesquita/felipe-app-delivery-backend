import { Router } from 'express';
import ClientsAdminController from './controllers/clients.controller';

const routerClientAdmin = Router();
const clientAdminController = new ClientsAdminController();

routerClientAdmin.get('/', clientAdminController.list);

export default routerClientAdmin;
