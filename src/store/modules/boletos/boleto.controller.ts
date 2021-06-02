import { Request, Response } from 'express';

import { ListBoletosService } from './services';

export class BoletoController {
  async list(req: Request, res: Response): Promise<Response> {
    try {
      const listBoletosService = new ListBoletosService();

      const result = await listBoletosService.execute(req.client.id);

      if(result.err) throw new Error(result.err);

      return res.json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
};
