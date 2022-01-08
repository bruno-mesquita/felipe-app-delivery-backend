import Controller from '@shared/utils/controller';
import { Request, Response } from 'express';

import { CreateCategoryService, ListCategoriesService, UpdateCategoryService } from './services';

class EstablishmentController extends Controller {
  private readonly createCategoryService: CreateCategoryService;
  private readonly listCategoriesService: ListCategoriesService;
  private readonly updateCategoryService: UpdateCategoryService;

  constructor() {
    super();

    this.createCategoryService = new CreateCategoryService();
    this.listCategoriesService = new ListCategoriesService();
    this.updateCategoryService = new UpdateCategoryService();

    this.update = this.update.bind(this);
    this.create = this.create.bind(this);
    this.list = this.list.bind(this);
  }

  async update({ params, body }: Request, res: Response): Promise<Response> {
    try {
      const { id } = params;

      return res.json(await this.updateCategoryService.execute({ ...body, id }));
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async create({ body }: Request, res: Response): Promise<Response> {
    try {
      return res.status(201).json(await this.createCategoryService.execute(body));
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async list(_: Request, res: Response): Promise<Response> {
    try {
      return res.json(await this.listCategoriesService.execute());
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}

export default EstablishmentController;
