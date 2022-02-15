import isAuthenticated from '@shared/middlewares/is-authenticated';
import { accessEstablishmentOwner } from '@shared/middlewares/access-establishment-owner';

const middlewares = [isAuthenticated, accessEstablishmentOwner];

export default middlewares;
