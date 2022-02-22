import type { Request, Response } from 'express';

import Controller from '@shared/utils/controller';

import {
  CreateCityService,
  UpdateCityService,
  ListCitiesService,
  FindOneCityService,
} from './services';

export class CityController extends Controller {
  private readonly createCityService: CreateCityService;

  private readonly updateCityService: UpdateCityService;

  private readonly listCitiesService: ListCitiesService;

  private readonly findOneCityService: FindOneCityService;

  constructor() {
    super();

    this.createCityService = new CreateCityService();
    this.updateCityService = new UpdateCityService();
    this.listCitiesService = new ListCitiesService();
    this.findOneCityService = new FindOneCityService();

    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.list = this.list.bind(this);
    this.findOne = this.findOne.bind(this);
  }

  async create({ body }: Request, res: Response): Promise<Response> {
    try {
      const cityId = await this.createCityService.execute(body);

      return res.status(201).json({ cityId });
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async update({ body, params }: Request, res: Response): Promise<Response> {
    try {
      await this.updateCityService.execute({ ...body, id: params.id });

      return res.status(204).json({});
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async list(_: Request, res: Response): Promise<Response> {
    try {
      return res.json(await this.listCitiesService.execute());
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async findOne({ params }: Request, res: Response): Promise<Response> {
    try {
      return res.json(await this.findOneCityService.execute(params.cityId));
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}
