import 'dotenv/config';
import express, { Router, json } from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';

import '@shared/utils/yup-helpers';
import loggerMiddleware from '@shared/middlewares/logger';

// routas
import customerRoutes from '@customer/http/routes';
import storeRoutes from '@store/http/routes';
import cityManagerRoutes from '../../city-manager/http/routes';
import adminRoutes from '../../admin/http/routes';

const routes = Router();

routes.use('/city-manager', cityManagerRoutes);
routes.use('/app', customerRoutes);
routes.use('/app-store', storeRoutes);
routes.use('/admin', adminRoutes);

const server = express();
server.use(json({ limit: '15mb' }));
server.use(cors());
server.use(compression());
server.use(helmet());
server.use(loggerMiddleware());
server.disable('x-powered-by');
server.use('/api', routes);

export default server;
