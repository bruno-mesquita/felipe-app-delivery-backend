import { Request, Response } from 'express';
import { ListMenuService } from '../services/list-menu-service/list-menu.service';

export class MenuController {
  async listMenu(req: Request, res: Response): Promise<Response> {
    try {
      const listMenuService = new ListMenuService();

      const { id } = req.params;

      const list = await listMenuService.execute(id);

      return res.status(200).json(list);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}
