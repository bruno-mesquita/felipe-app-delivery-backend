import { Router } from 'express';
import { TermsOfUseController } from './terms-of-use.controller';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { accessAdmin } from '@shared/middlewares/access-admin';

const termsOfUseController = new TermsOfUseController();

const routes = Router();

routes.post('/terms-of-use', isAuthenticated, accessAdmin, termsOfUseController.create);
routes.put('/terms-of-use/:id', isAuthenticated, accessAdmin, termsOfUseController.update);
// routes.get('/states', termsOfUseController.list);

export  { routes };
