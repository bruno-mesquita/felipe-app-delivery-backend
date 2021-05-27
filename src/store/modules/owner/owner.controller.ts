import { Request, Response } from 'express';

import { UpdatePasswordEstabishmentService } from './services';

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
};
