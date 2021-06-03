import { Request, Response } from 'express';

import { UpdatePasswordEstabishmentService, UpdateOwnerProfileService, ProfileOwnertService } from './services';

export class OwnerController {
  async updatePassword(req: Request, res: Response): Promise<Response> {
    try {
      const updatePasswordEstabishmentService = new UpdatePasswordEstabishmentService();

      const result = await updatePasswordEstabishmentService.execute({ ...req.body, id: req.client.id });

      if (result.err) throw new Error(result.err);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async updateOwner(req: Request, res: Response): Promise<Response> {
    try {
      const updateOwnerProfileService = new UpdateOwnerProfileService();

      const result = await updateOwnerProfileService.execute(req.body, req.client.id);

      if (result.err) throw new Error(result.err);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async me(req: Request, res: Response): Promise<Response> {
    try {
      const profileOwnertService = new ProfileOwnertService();

      const result = await profileOwnertService.execute(req.body.selects, req.client.id);

      if (result.err) throw new Error(result.err);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
};
