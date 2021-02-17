import routerEstablishment from '@modules/admin/establishment/establishment.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/admin/store', routerEstablishment);

export default routes;
