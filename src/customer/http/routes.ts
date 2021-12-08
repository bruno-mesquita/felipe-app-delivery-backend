import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { accessClient } from '@shared/middlewares/access-client';

import { ClientController } from '../modules/client';
import { AuthController } from '../modules/auth/auth.controller';
import { AvatarController } from '../modules/avatar';
import { CategoryController } from '../modules/category';
import { EstablishmentController } from '../modules/establishment';
import { ClientAddressController } from '../modules/address-client';
import { AddressStateController } from '../modules/address-state';
import { OrderController } from '../modules/order';
import { MenuController } from '../modules/menus';
import { RateController } from '../modules/rate';
import { notificationsRoutes } from '../modules/notifications';
import { TermsOfUseController } from '@customer/modules/terms-of-use/terms-of-use.controller';
import { DeliverymanController } from '@customer/modules/deliveryman/deliveryman.controller';
import { AnnouncementController } from '@customer/modules/announcement/announcement-controller';

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
const termsOfUseController = new TermsOfUseController();
const rateController = new RateController();
const deliverymanController = new DeliverymanController();
const announcementController = new AnnouncementController();

const routes = Router();

// Rotas não autenticadas

// Clients
routes.post('/clients', clientController.create);
routes.put('/clients/forgot-password', authController.setPassword);

// Auth
routes.post('/auth/login', authController.login);
routes.post('/auth/refresh', authController.refresh);

routes.get('/terms-of-use', termsOfUseController.show);

// State
routes.get('/states', addressStateController.listState);
routes.get('/cities/:state_id', addressStateController.listCitiesByState);

// Client
routes.put('/clients/activate', isAuthenticated, clientController.activate);

// Rotas autenticadas

// Clients
routes.put('/clients', isAuthenticated, accessClient, clientController.updateProfile);
routes.put('/clients/update-password', isAuthenticated, accessClient, clientController.updatePassword);
routes.get('/clients/orders', isAuthenticated, accessClient, clientController.listOrdersByClient);
routes.post('/clients/me', isAuthenticated, clientController.profile);
routes.delete('/clients', isAuthenticated, accessClient, clientController.remove);
routes.put('/clients/deactivate', isAuthenticated, accessClient, clientController.deactivate);

// Avatar
routes.post('/avatar', isAuthenticated, accessClient,  avatarController.create);
routes.get('/avatar', isAuthenticated, accessClient, avatarController.findOneAvatarByUserId);

// Endereços do cliente
routes.get('/adresses-client', isAuthenticated, accessClient, clientAddressController.list);
routes.get('/adresses-client/:id', isAuthenticated, accessClient, clientAddressController.findOne);
routes.post('/adresses-client', isAuthenticated, accessClient, clientAddressController.create);
routes.put('/adresses-client/:id', isAuthenticated, accessClient, clientAddressController.update);
routes.put('/adresses-client/:id/active', isAuthenticated, accessClient, clientAddressController.active);
routes.put('/adresses-client/:id/deactivate', isAuthenticated, accessClient, clientAddressController.deactivate);
routes.delete('/adresses-client/:addressClientId', isAuthenticated, accessClient, clientAddressController.delete);

// Categoria
routes.get('/categories', isAuthenticated, accessClient, categoryController.getAll);

// Estabelecimento
routes.get('/establishments/:id', isAuthenticated, accessClient, establishmentController.findOne);
routes.get('/establishments-by-name', isAuthenticated, accessClient, establishmentController.searchByName);
routes.get('/establishments', isAuthenticated, accessClient, establishmentController.list);
routes.get('/establishments/:id/menus', isAuthenticated, accessClient, establishmentController.listMenus);

// menu
routes.get('/menus/:id/products', isAuthenticated, accessClient, menuController.findProductsByMenu);

// Orders
routes.post('/orders', isAuthenticated, accessClient, orderController.create);
routes.get('/orders/:id', isAuthenticated, accessClient, orderController.show);
routes.get('/orders/:id/verify', isAuthenticated, accessClient, orderController.verify);
routes.post('/orders/:id/rate', isAuthenticated, accessClient, orderController.rateOrder);

routes.get('/rates/:id', isAuthenticated, accessClient, rateController.findOne);

routes.get('/deliveryman', isAuthenticated, accessClient, deliverymanController.list);

routes.get('/announcement', isAuthenticated, accessClient, announcementController.list);

routes.use(notificationsRoutes);

export default routes;
