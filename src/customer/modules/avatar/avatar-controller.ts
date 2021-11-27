import { Request, Response } from 'express';

import { CreateAvatarClientService, FindOneAvatarClientClientService } from './services';

class AvatarController {
  async create({ body, client }: Request, res: Response): Promise<Response> {
    try {
      const avatarService = new CreateAvatarClientService();

      const avatar = await avatarService.execute({ ...body, client_id: client.id });

      if (avatar.err) throw new Error(avatar.err);

      return res.status(201).json(avatar);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async findOneAvatarByUserId({ client }: Request, res: Response): Promise<Response> {
    try {
      const findOneAvatarClientClientService = new FindOneAvatarClientClientService();

      const avatar = await findOneAvatarClientClientService.execute(client.id);

      if (avatar.err) throw new Error(avatar.err);

      return res.status(200).json(avatar);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export { AvatarController };
