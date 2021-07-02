import { Request, Response } from 'express';

import { FindProductsByMenuService } from './services';

export class MenuController {
  async findProductsByMenu(req: Request, res: Response): Promise<Response> {
    try {
      const { page = 0 } = req.query;
      const { id } = req.params;

      const findProductsByMenuService = new FindProductsByMenuService();

      const result = await findProductsByMenuService.execute(Number(id), Number(page) || 0);

      if(result.err) throw new Error(result.err);

      return res.json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}
