import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { ClientController } from '../modules/client';
import { AuthController } from '../modules/auth';
import { AvatarController } from '../modules/avatar';
import { CategoryController } from '../modules/category';
import { EstablishmentController } from '../modules/establishment';
import { ClientAddressController } from '../modules/address-client';
import { AddressStateController } from '../modules/address-state';
import { OrderController } from '../modules/order';
import { MenuController } from '../modules/menus';

// Controllers
const authController = new AuthController();
const clientController = new ClientController();
const addressStateController = new AddressStateController();
const clientAddressController = new ClientAddressController();
const avatarController = new AvatarController();
const categoryController = new CategoryController();
const establishmentController = new EstablishmentController();
const menuController = new MenuController();
const orderController = new OrderController();

const routes = Router();

// Rotas não autenticadas //

// Clients
routes.post('/clients', clientController.create);

// Rotas autenticadas //

// Auth
routes.post('/auth/login', authController.login);

// State
routes.get('/states', addressStateController.listState);
routes.get('/cities/:state_id', addressStateController.listCitiesByState);

// Client
routes.post('/clients/activate', clientController.activate);

// Rotas autenticadas
routes.use(isAuthenticated);

// Clients
routes.put('/clients', clientController.updateProfile);
routes.put('/clients/update-password', clientController.updatePassword);
routes.get('/clients/orders', clientController.listOrdersByClient);
routes.post('/clients/me', clientController.profile);

// Avatar
routes.post('/avatar', avatarController.create);
routes.get('/avatar', avatarController.findOneAvatarByUserId);

// Endereços do cliente
routes.get('/adresses-client', clientAddressController.list);
routes.get('/adresses-client/:id', clientAddressController.findOne);
routes.post('/adresses-client', clientAddressController.create);
routes.put('/adresses-client/:id', clientAddressController.update);
routes.put('/adresses-client/:id/active', clientAddressController.active);
routes.put('/adresses-client/:id/deactivate', clientAddressController.deactivate);
routes.delete('/adresses-client/:addressClientId', clientAddressController.delete);

// Categoria
routes.get('/categories', categoryController.getAll);

// Estabelecimento
routes.get('/establishments/:id', establishmentController.findOne);
routes.post('/establishments-by-name', establishmentController.searchByName);
routes.get('/establishments', establishmentController.list);

// menu
routes.get('/menus/:id/products', menuController.findProductsByMenu);

// Orders
routes.use(isAuthenticated);
routes.post('/orders', orderController.create);
routes.get('/orders/:id', orderController.show);
routes.get('/orders/:id/verify', orderController.verify);
routes.post('/orders/:id/rate', orderController.rateOrder);

export default routes;
