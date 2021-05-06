import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { ClientController } from '../modules/client';
import { AuthController } from '../modules/auth/controllers';
import { ForgotPasswordController } from '../modules/auth/controllers/forgot-password-controller';
import { AvatarController } from '../modules/avatar';
import { CategoryController } from '../modules/category';
import { EstablishmentController } from '../modules/establishment';
import { ClientAddressController } from '../modules/address-client';
import { AddressStateController } from '../modules/address-state';
import { OrderController } from '../modules/order';
import { MenuController } from '../modules/menus';
import { TermsOfUseController } from '@customer/modules/terms-of-use/terms-of-use.controller';

// Controllers
const authController = new AuthController();
const clientController = new ClientController();
const forgotPassword = new ForgotPasswordController();
const addressStateController = new AddressStateController();
const clientAddressController = new ClientAddressController();
const avatarController = new AvatarController();
const categoryController = new CategoryController();
const establishmentController = new EstablishmentController();
const menuController = new MenuController();
const orderController = new OrderController();
const termsOfUseController = new TermsOfUseController();

const routes = Router();

// Rotas não autenticadas

// Clients
routes.post('/clients', clientController.create);
routes.put('/clients/forgot-password', forgotPassword.setPassword);

// Rotas autenticadas //

// Auth
routes.post('/auth/login', authController.login);
routes.post('/auth/refresh', authController.refresh);

routes.get('/terms-of-use', termsOfUseController.show);

// State
routes.get('/states', addressStateController.listState);
routes.get('/cities/:state_id', addressStateController.listCitiesByState);

// Client
routes.post('/clients/activate', clientController.activate);

// Rotas autenticadas

// Clients
routes.put('/clients', isAuthenticated, clientController.updateProfile);
routes.put('/clients/update-password', isAuthenticated, clientController.updatePassword);
routes.get('/clients/orders', isAuthenticated, clientController.listOrdersByClient);
routes.post('/clients/me', isAuthenticated, clientController.profile);

// Avatar
routes.post('/avatar', avatarController.create);
routes.get('/avatar', avatarController.findOneAvatarByUserId);

// Endereços do cliente
routes.get('/adresses-client', isAuthenticated, clientAddressController.list);
routes.get('/adresses-client/:id', isAuthenticated, clientAddressController.findOne);
routes.post('/adresses-client', isAuthenticated, clientAddressController.create);
routes.put('/adresses-client/:id', isAuthenticated, clientAddressController.update);
routes.put('/adresses-client/:id/active', isAuthenticated, clientAddressController.active);
routes.put('/adresses-client/:id/deactivate', isAuthenticated, clientAddressController.deactivate);
routes.delete('/adresses-client/:addressClientId', isAuthenticated, clientAddressController.delete);

// Categoria
routes.get('/categories', isAuthenticated, categoryController.getAll);

// Estabelecimento
routes.get('/establishments/:id', isAuthenticated, establishmentController.findOne);
routes.post('/establishments-by-name', isAuthenticated, establishmentController.searchByName);
routes.get('/establishments', isAuthenticated, establishmentController.list);
routes.get('/establishments/:id/menus', isAuthenticated, establishmentController.listMenus);

// menu
routes.get('/menus/:id/products', isAuthenticated, menuController.findProductsByMenu);

// Orders
routes.post('/orders', isAuthenticated, orderController.create);
routes.get('/orders/:id', isAuthenticated, orderController.show);
routes.get('/orders/:id/verify', isAuthenticated, orderController.verify);
routes.post('/orders/:id/rate', isAuthenticated, orderController.rateOrder);

export default routes;
