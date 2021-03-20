import { Request, Response } from 'express';
import { CreateAvatarClientService } from './create-avatar-client-service';

class AvatarController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { client_id } = req.body;

      const avatarService = new CreateAvatarClientService();

      const avatar = await avatarService.execute({ ...req.body, client_id });

      if (avatar.err) throw new Error(avatar.err);

      return res.status(201).json(avatar);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export { AvatarController };
