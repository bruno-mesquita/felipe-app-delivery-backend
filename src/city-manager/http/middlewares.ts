import isAuthenticated from '@shared/middlewares/is-authenticated';
import { accessCityManager } from '@shared/middlewares/access-city-manager';

export default [isAuthenticated, accessCityManager];
