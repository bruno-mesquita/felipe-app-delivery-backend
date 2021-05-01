/**
 * @fileoverview Controller do estabelecimento Admin
 *
 * @author Jonatas Rosa Moura
 */

import { Router } from 'express';
import { TermsOfUseController } from './terms-of-use.controller';

const termsOfUseController = new TermsOfUseController();
const termsOfUseRoutes = Router();

termsOfUseRoutes.get('/terms-of-use', termsOfUseController.show);

export { termsOfUseRoutes };
