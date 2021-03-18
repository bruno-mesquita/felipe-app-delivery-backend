import { Router } from 'express';
import { AvatarController } from './avatar-controller';

const avatarController = new AvatarController();

const avatarRoutes = Router();

avatarRoutes.post('/avatar', avatarController.create);

export { avatarRoutes };
