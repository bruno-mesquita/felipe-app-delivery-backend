/**
 * @fileoverview Instanciando o server e configurando
 *
 * @author Bruno, Jonatas
 */

import 'dotenv/config';
import express, { Router } from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import '@shared/typeorm';

// routas
import adminRoutes from '@admin/http/routes';
import customerRoutes from '@customer/http/routes';
import storeRoutes from '@store/http/routes';

const routes = Router();

routes.use('/app', customerRoutes);
routes.use('/admin', adminRoutes);
routes.use('/app-store', storeRoutes);

const app = express();
app.use(express.json());
app.use(cors());
app.use(compression());
app.use(helmet());
app.disable('x-powered-by');
app.use('/api', routes);

app.listen(3030, () => {
  console.log(`Server started ON! ${3030}`);
});
