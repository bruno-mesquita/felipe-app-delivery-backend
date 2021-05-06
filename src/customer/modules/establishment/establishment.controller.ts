import { Request, Response } from 'express';

import { ListEstablishmentService, FindOneEstablishmentService, SearchEstablishmentsByName, ListMenusByEstablishmentService } from './services';

class EstablishmentController {
  async list(req: Request, res: Response): Promise<Response> {
    try {
      const { categoryId, page }: any = req.query;

      const listEstablishmentService = new ListEstablishmentService();

      const response = await listEstablishmentService.execute(categoryId, req.client.id, page);

      if(response.err) throw new Error(response.err);

      return res.json(response);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async listMenus(req: Request, res: Response): Promise<Response> {
    try {
      const { id }: any = req.params;

      const listMenusByEstablishmentService = new ListMenusByEstablishmentService();

      const response = await listMenusByEstablishmentService.execute(id);

      if(response.err) throw new Error(response.err);

      return res.json(response);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const findOneEstablishmentService = new FindOneEstablishmentService();

      const response = await findOneEstablishmentService.execute(id);

      return res.json(response);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async searchByName(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.body;

      const searchEstablishmentsByName = new SearchEstablishmentsByName();

      const response = await searchEstablishmentsByName.execute(name, req.client.id);

      if (response.err) throw new Error(response.err);

      return res.status(200).json(response);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export default EstablishmentController;
