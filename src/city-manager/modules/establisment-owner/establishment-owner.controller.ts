import { Request, Response } from 'express';

import {
  CreateOwnerService,
  ListOwnerService,
  ShowOwnerEstablishmentService,
} from './services';

export class EstablishmentOwnerController {
  async list(req: Request, res: Response): Promise<Response> {
    try {
      const listOwnerService = new ListOwnerService();

      const result = await listOwnerService.execute();

      if(result.err) throw new Error(result.err);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  };

  async show(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const showOwnerEstablishment = new ShowOwnerEstablishmentService();

      const result = await showOwnerEstablishment.execute(Number(id));

      if(result.err) throw new Error(result.err);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  };

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const createOwnerService = new CreateOwnerService();

      const result = await createOwnerService.execute({ ...req.body, created_by_id: req.client.id });

      if(result.err) throw new Error(result.err);

      return res.status(201).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  };
};
