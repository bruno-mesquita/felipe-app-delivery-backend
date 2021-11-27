import { Request, Response } from 'express';

import { CreateMenuService, DeleteMenuService, ListMenuService, UpdateMenuService, GetMenuService } from './services';

export class MenuController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const menuService = new CreateMenuService();

      const menu = await menuService.execute({ ...req.body, establishmentId: req.client.entity.establishment_id });

      if (menu.err) throw new Error(menu.err);

      return res.status(201).json(menu);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const menuService = new ListMenuService();

      const establishmentId = req.client.entity.getEstablishmentId();

      if(!establishmentId) throw new Error('Id invalido ou inexistente');

      const menu = await menuService.execute(establishmentId);

      if (menu.err) throw new Error(menu.err);

      return res.json(menu);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const menuService = new GetMenuService();

      const establishmentId = req.client.entity.getEstablishmentId();
      const { id } = req.params;

      if(!establishmentId) throw new Error('Id invalido ou inexistente');

      const menu = await menuService.execute(establishmentId, id);

      if (menu.err) throw new Error(menu.err);

      return res.json(menu);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async update({ params, body, client }: Request, res: Response): Promise<Response> {
    try {
      const menuService = new UpdateMenuService();

      const establishmentId = client.entity.getEstablishmentId();

      const menu = await menuService.execute({ id: Number(params.id), name: body.name, establishmentId: establishmentId });

      if (menu.err) throw new Error(menu.err);

      return res.json(menu);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async delete({ params, client }: Request, res: Response): Promise<Response> {
    try {
      const menuService = new DeleteMenuService();

      const establishmentId = client.entity.getEstablishmentId();

      const menu = await menuService.execute({ id: Number(params.id), establishmentId: establishmentId });

      if (menu.err) throw new Error(menu.err);

      return res.json(menu);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}
