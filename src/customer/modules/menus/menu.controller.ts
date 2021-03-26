import { Request, Response } from 'express';

import { FindProductsByMenuService } from './services';

export class MenuController {
  async findProductsByMenu(req: Request, res: Response): Promise<Response> {
    try {
      const findProductsByMenuService = new FindProductsByMenuService();

      const result = await findProductsByMenuService.execute(req.params.id);

      return res.json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}
