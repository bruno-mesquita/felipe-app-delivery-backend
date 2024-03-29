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
    super();

    this.listEstablishmentService = new ListEstablishmentService();
    this.findOneEstablishmentService = new FindOneEstablishmentService();
    this.searchEstablishmentsByName = new SearchEstablishmentsByName();
    this.listMenusByEstablishmentService =
      new ListMenusByEstablishmentService();

    this.list = this.list.bind(this);
    this.listMenus = this.listMenus.bind(this);
    this.findOne = this.findOne.bind(this);
    this.searchByName = this.searchByName.bind(this);
  }

  async list({ query, client }: Request, res: Response): Promise<Response> {
    try {
      const { category, page = 0 }: any = query;

      return res.json(
        await this.listEstablishmentService.execute(
          category,
          client.id,
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

      return res.json(
        await this.findOneEstablishmentService.execute(Number(id))
      );
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async searchByName(
    { query, client }: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { name, category } = query;

      return res.json(
        await this.searchEstablishmentsByName.execute(
          name as string,
          category as string,
          client.id
        )
      );
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}

export default EstablishmentController;
