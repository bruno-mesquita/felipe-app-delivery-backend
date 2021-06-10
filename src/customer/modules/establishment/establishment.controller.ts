import { Request, Response } from 'express';

import { ListEstablishmentService, FindOneEstablishmentService, SearchEstablishmentsByName, ListMenusByEstablishmentService } from './services';

class EstablishmentController {
  async list(req: Request, res: Response): Promise<Response> {
    try {
      const { category, page }: any = req.query;

      const listEstablishmentService = new ListEstablishmentService();

      const response = await listEstablishmentService.execute(category, req.client.id, page);

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

      const response = await findOneEstablishmentService.execute(Number(id));

      return res.json(response);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async searchByName(req: Request, res: Response): Promise<Response> {
    try {
      const { name, category } = req.query;

      const searchEstablishmentsByName = new SearchEstablishmentsByName();

      const response = await searchEstablishmentsByName.execute(name as string, category as string, req.client.id);

      if (response.err) throw new Error(response.err);

      return res.status(200).json(response);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export default EstablishmentController;
