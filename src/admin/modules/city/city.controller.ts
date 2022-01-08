import Controller from '@shared/utils/controller';
import { Request, Response } from 'express';

import { CreateCityService, UpdateCityService, ListCitiesService, ListCitiesByStateService } from './services';

export class CityController extends Controller {
  private readonly createCityService: CreateCityService;
  private readonly updateCityService: UpdateCityService;
  private readonly listCitiesService: ListCitiesService;
  private readonly listCitiesByStateService: ListCitiesByStateService;

  constructor() {
    super();

    this.createCityService = new CreateCityService();
    this.updateCityService = new UpdateCityService();
    this.listCitiesService = new ListCitiesService();
    this.listCitiesByStateService = new ListCitiesByStateService();

    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.list = this.list.bind(this);
    this.listByState = this.listByState.bind(this);
  }

  async create({ body }: Request, res: Response): Promise<Response> {
    try {
      return res.status(201).json(await this.createCityService.execute(body));
    } catch (err) {
      this.requestError(err, res);
    }
  }

  async update({ body, params }: Request, res: Response): Promise<Response> {
    try {
      return res.json(await this.updateCityService.execute({ ...body, id: params.id }));
    } catch (err) {
      this.requestError(err, res);
    }
  }

  async list(_: Request, res: Response): Promise<Response> {
    try {
      return res.json(await this.listCitiesService.execute());
    } catch (err) {
      this.requestError(err, res);
    }
  }

  async listByState({ params }: Request, res: Response): Promise<Response> {
    try {
      return res.json(await this.listCitiesByStateService.execute(params.stateId));
    } catch (err) {
      this.requestError(err, res);
    }
  }
}
