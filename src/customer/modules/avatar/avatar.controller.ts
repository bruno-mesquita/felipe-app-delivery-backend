import Controller from '@shared/utils/controller';
import type { Request, Response } from 'express';

import {
  CreateAvatarClientService,
  FindOneAvatarClientClientService,
} from './services';
import { createAvatarValidate } from './validations';

class AvatarController extends Controller {
  constructor() {
    super();

    this.create = this.create.bind(this);
    this.findOne = this.findOne.bind(this);
  }

  async create({ body, client }: Request, res: Response): Promise<Response> {
    try {
      const values = createAvatarValidate({
        ...body,
        clientId: client.id,
      });

      const avatarService = new CreateAvatarClientService();

      const avatar = await avatarService.execute(values);

      return res.status(201).json(avatar);
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async findOne({ client }: Request, res: Response): Promise<Response> {
    try {
      const findOneAvatarClientClientService =
        new FindOneAvatarClientClientService();

      const avatar = await findOneAvatarClientClientService.execute(client.id);

      return res.json(avatar);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export default AvatarController;
