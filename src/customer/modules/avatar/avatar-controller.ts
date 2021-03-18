import { Request, Response } from 'express';
import { AvatarClientService } from './avatar-client-service';

class AvatarController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const avatarService = new AvatarClientService();

      const avatar = await avatarService.execute(req.body);

      if (avatar.err) throw new Error(avatar.err);

      return res.status(201).json(avatar);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export { AvatarController };
