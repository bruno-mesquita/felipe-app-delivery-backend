import Controller from '@shared/utils/controller';
import { Request, Response } from 'express';
import { CreateStateService, ListStatesService, UpdateStateService } from './services';

export class StateController extends Controller {
  private createStateService: CreateStateService;
  private listStatesService: ListStatesService;
  private updateStateService: UpdateStateService;

  constructor() {
    super();

    this.createStateService = new CreateStateService();
    this.listStatesService = new ListStatesService();
    this.updateStateService = new UpdateStateService();

    this.create = this.create.bind(this);
    this.list = this.list.bind(this);
    this.update = this.update.bind(this);
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
}
