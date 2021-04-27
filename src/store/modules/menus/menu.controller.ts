import { Request, Response } from 'express';

import { CreateMenuService, DeleteMenuService, ListMenuService, UpdateMenuService } from './services';

export class MenuController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const menuService = new CreateMenuService();

      const menu = await menuService.execute({ ...req.body, establishment: req.client.id });

      if (menu.err) throw new Error(menu.err);

      return res.status(201).json(menu);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const menuService = new ListMenuService();

      const menu = await menuService.execute(req.client.id);

      if (menu.err) throw new Error(menu.err);

      return res.json(menu);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const menuService = new UpdateMenuService();

      const menu = await menuService.execute({ ...req.body, establishment: req.client.id });

      if (menu.err) throw new Error(menu.err);

      return res.json(menu);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const menuService = new DeleteMenuService();

      const menu = await menuService.execute({ id: Number(req.params.id), establishmentId: req.client.id });

      if (menu.err) throw new Error(menu.err);

      return res.json(menu);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}