import { Request, Response } from 'express';
import { CreateMenuService } from './services/create-menu.service';

export class MenuController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { establishment } = req.body;

      const menuService = new CreateMenuService();

      const menu = await menuService.execute({ ...req.body, establishment });

      if (menu.err) throw new Error(menu.err);

      return res.status(201).json(menu);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}
