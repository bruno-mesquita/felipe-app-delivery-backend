import type { Request, Response } from 'express';

import { ListBoletosService, NewBoletoService } from './services';

export class BoletoController {
  async list(req: Request, res: Response): Promise<Response> {
    try {
      const listBoletosService = new ListBoletosService();

      const result = await listBoletosService.execute(
        req.client.entity.getId(),
        Number(req.query.page || 0)
      );

      if (result.err) throw new Error(result.err);

      return res.json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async newBoleto(req: Request, res: Response): Promise<Response> {
    try {
      const newBoletoService = new NewBoletoService();

      const result = await newBoletoService.execute(
        req.client.entity,
        Number(req.params.id)
      );

      if (result.err) throw new Error(result.err);

      return res.json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}
