import 'dotenv/config';
import express, { Router, json } from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import '@shared/database';

// routas
import adminRoutes from '@admin/http/routes';
import customerRoutes from '@customer/http/routes';
import storeRoutes from '@store/http/routes';

const routes = Router();

routes.use('/admin', adminRoutes);
routes.use('/app', customerRoutes);
routes.use('/app-store', storeRoutes);

const app = express();
app.use(json({ limit: '15mb' }));
app.use(cors());
app.use(compression());
app.use(helmet());
app.disable('x-powered-by');
app.use('/api', routes);

app.listen(process.env.API_PORT || 3030, () => {
  console.log(`Server started ON! ${process.env.API_PORT || 3030}`);
});
