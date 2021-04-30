import { Router } from 'express';
import { TermsOfUseController } from './terms-of-use.controller';

const termsOfUseController = new TermsOfUseController();

const routes = Router();

routes.post('/terms-of-use', termsOfUseController.create);
routes.put('/terms-of-use/:id', termsOfUseController.update);
// routes.get('/states', termsOfUseController.list);

export  { routes };
