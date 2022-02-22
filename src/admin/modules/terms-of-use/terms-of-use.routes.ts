import { Router } from 'express';
import middlewares from '@admin/http/middlewares';
import { TermsOfUseController } from './terms-of-use.controller';

const termsOfUseController = new TermsOfUseController();

const routes = Router();

routes.post('/terms-of-use', ...middlewares, termsOfUseController.create);
routes.put('/terms-of-use/:id', ...middlewares, termsOfUseController.update);
routes.get('/terms-of-use', ...middlewares, termsOfUseController.show);

export { routes };
