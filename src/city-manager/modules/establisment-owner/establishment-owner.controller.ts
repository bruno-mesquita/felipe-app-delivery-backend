import type { Request, Response } from 'express';

import Controller from '@shared/utils/controller';
import {
  CreateOwnerService,
  ListOwnerService,
  ShowOwnerEstablishmentService,
  UpdateOwnerService,
} from './services';

export class EstablishmentOwnerController extends Controller {
  private listOwnerService: ListOwnerService;
  private showOwnerEstablishmentService: ShowOwnerEstablishmentService;
  private createOwnerService: CreateOwnerService;
  private updateOwnerService: UpdateOwnerService;

  constructor() {
    super();

    this.listOwnerService = new ListOwnerService();
    this.showOwnerEstablishmentService = new ShowOwnerEstablishmentService();
    this.createOwnerService = new CreateOwnerService();
    this.updateOwnerService = new UpdateOwnerService();

    this.list = this.list.bind(this);
    this.show = this.show.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }

  async list(_: Request, res: Response): Promise<Response> {
    try {
      return res.json(await this.listOwnerService.execute());
    } catch (err) {
      return this.requestError(err, res);
    }
  };

  async show({ params }: Request, res: Response): Promise<Response> {
    try {
      return res.json(await this.showOwnerEstablishmentService.execute(Number(params.id)));
    } catch (err) {
      return this.requestError(err, res);
    }
  };

  async create({ body, client }: Request, res: Response): Promise<Response> {
    try {
      return res.json(await this.createOwnerService.execute({ ...body, created_by_id: client.id }));
    } catch (err) {
      return this.requestError(err, res);
    }
  };

  async update({ body }: Request, res: Response): Promise<Response> {
    try {
      return res.json(await this.updateOwnerService.execute(body));
    } catch (err) {
      return this.requestError(err, res);
    }
  };
};
