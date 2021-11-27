import { Request, Response } from 'express';

import { ListEstablishmentService, FindOneEstablishmentService, SearchEstablishmentsByName, ListMenusByEstablishmentService } from './services';

class EstablishmentController {
  async list({ query, client }: Request, res: Response): Promise<Response> {
    try {
      const { category, page = 0 }: any = query;

      const listEstablishmentService = new ListEstablishmentService();

      const response = await listEstablishmentService.execute(category, client.id, Number(page));

      if(response.err) throw new Error(response.err);

      return res.json(response);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async listMenus({ params }: Request, res: Response): Promise<Response> {
    try {
      const { id }: any = params;

      const listMenusByEstablishmentService = new ListMenusByEstablishmentService();

      const response = await listMenusByEstablishmentService.execute(id);

      if(response.err) throw new Error(response.err);

      return res.json(response);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async findOne({ params }: Request, res: Response): Promise<Response> {
    try {
      const { id } = params;

      const findOneEstablishmentService = new FindOneEstablishmentService();

      const response = await findOneEstablishmentService.execute(Number(id));

      return res.json(response);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async searchByName({ query, client }: Request, res: Response): Promise<Response> {
    try {
      const { name, category } = query;

      const searchEstablishmentsByName = new SearchEstablishmentsByName();

      const response = await searchEstablishmentsByName.execute(name as string, category as string, client.id);

      if (response.err) throw new Error(response.err);

      return res.json(response);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export default EstablishmentController;
