import { Request, Response } from 'express';

import { ListDeliverymanService } from './services';

export class DeliverymanController {
  async list({ query }: Request, res: Response): Promise<Response> {
    try {
      const listDeliverymanService = new ListDeliverymanService();

      const { page = 0 } = query;

      const { err, result } = await listDeliverymanService.execute(Number(page) || 0);

      if(err) throw new Error();

      return res.json({ result });
    } catch (err) {
      return res.status(400).json({ err: 'Erro ao listar' });
    }
  }
}
