import type { Request, Response } from 'express';

import Controller from '@shared/utils/controller';
import { CreateStateService, ListStatesService, UpdateStateService, ListCitiesByStateService } from './services';

export class StateController extends Controller {
  private readonly createStateService: CreateStateService;
  private readonly listStatesService: ListStatesService;
  private readonly updateStateService: UpdateStateService;
  private readonly listCitiesByStateService: ListCitiesByStateService;

  constructor() {
    super();

    this.createStateService = new CreateStateService();
    this.listStatesService = new ListStatesService();
    this.updateStateService = new UpdateStateService();
    this.listCitiesByStateService = new ListCitiesByStateService();

    this.create = this.create.bind(this);
    this.list = this.list.bind(this);
    this.update = this.update.bind(this);
    this.listByState = this.listByState.bind(this);

  }

  async create({ body }: Request, res: Response): Promise<Response> {
    try {
      return res.status(201).json(await this.createStateService.execute(body));
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async list(_: Request, res: Response): Promise<Response> {
    try {
      return res.json(await this.listStatesService.execute());
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async update({ params, body }: Request, res: Response): Promise<Response> {
    try {
      const { id } = params;

      await this.updateStateService.execute({ ...body, id });

      return res.status(204).json({});
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async listByState({ params }: Request, res: Response): Promise<Response> {
    try {
      return res.json(await this.listCitiesByStateService.execute(params.stateId));
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}
