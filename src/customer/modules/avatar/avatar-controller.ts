import { Request, Response } from 'express';
import { CreateAvatarClientService, FindOneAvatarClientClientService } from './services';

class AvatarController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const avatarService = new CreateAvatarClientService();

      const avatar = await avatarService.execute({ ...req.body, client_id: req.client.id });

      if (avatar.err) throw new Error(avatar.err);

      return res.status(201).json(avatar);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async findOneAvatarByUserId(req: Request, res: Response): Promise<Response> {
    try {
      const findOneAvatarClientClientService = new FindOneAvatarClientClientService();

      const avatar = await findOneAvatarClientClientService.execute(req.client.id);

      if (avatar.err) throw new Error(avatar.err);

      return res.status(200).json(avatar);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export { AvatarController };
