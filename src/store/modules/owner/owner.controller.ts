import { Request, Response } from 'express';

import { UpdatePasswordEstabishmentService, UpdateOwnerProfileService, ProfileOwnertService } from './services';

export class OwnerController {
  async updatePassword({ body, client }: Request, res: Response): Promise<Response> {
    try {
      const updatePasswordEstabishmentService = new UpdatePasswordEstabishmentService();

      const result = await updatePasswordEstabishmentService.execute({ ...body, id: client.id });

      if (result.err) throw new Error(result.err);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async updateOwner({ body, client }: Request, res: Response): Promise<Response> {
    try {
      const updateOwnerProfileService = new UpdateOwnerProfileService();

      const result = await updateOwnerProfileService.execute(body, client.id);

      if (result.err) throw new Error(result.err);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async me({ body, client }: Request, res: Response): Promise<Response> {
    try {
      const profileOwnertService = new ProfileOwnertService();

      const result = await profileOwnertService.execute(body.selects, client.id);

      if (result.err) throw new Error(result.err);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
};
