import type { Request, Response } from 'express';

import Controller from '@shared/utils/controller';

import {
  ListEstablishmentService,
  FindOneEstablishmentService,
  SearchEstablishmentsByName,
  ListMenusByEstablishmentService,
} from './services';

class EstablishmentController extends Controller {
  private readonly listEstablishmentService: ListEstablishmentService;

  private readonly findOneEstablishmentService: FindOneEstablishmentService;

  private readonly searchEstablishmentsByName: SearchEstablishmentsByName;

  private readonly listMenusByEstablishmentService: ListMenusByEstablishmentService;

  constructor() {
    super(['list', 'listMenus', 'findOne', 'searchByName']);

    this.listEstablishmentService = new ListEstablishmentService();
    this.findOneEstablishmentService = new FindOneEstablishmentService();
    this.searchEstablishmentsByName = new SearchEstablishmentsByName();
    this.listMenusByEstablishmentService = new ListMenusByEstablishmentService();
  }

  async list({ query, client, headers }: Request, res: Response): Promise<Response> {
    try {
      const { category, page = 0 }: any = query;
      const { appversion } = headers;

      return res.json(
        await this.listEstablishmentService.execute(
          category,
          client.id,
          Number.parseFloat((appversion as any) || 1),
          Number(page)
        )
      );
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async listMenus({ params }: Request, res: Response): Promise<Response> {
    try {
      const { id }: any = params;

      return res.json(await this.listMenusByEstablishmentService.execute(id));
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async findOne({ params }: Request, res: Response): Promise<Response> {
    try {
      const { id } = params;

      return res.json(await this.findOneEstablishmentService.execute(Number(id)));
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async searchByName({ query, client }: Request, res: Response): Promise<Response> {
    try {
      const { name, category } = query;

      return res.json(await this.searchEstablishmentsByName.execute(name as string, category as string, client.id));
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}

export default EstablishmentController;
