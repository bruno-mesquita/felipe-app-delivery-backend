import { Request, Response } from 'express';

import { CreateOwnerService } from './services';

export class EstablishmentOwnerController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const createOwnerService = new CreateOwnerService();

      const result = createOwnerService.execute(req.body);

      return res.status(201).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
};
