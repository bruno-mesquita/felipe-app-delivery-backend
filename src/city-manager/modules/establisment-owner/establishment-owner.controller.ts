import { Request, Response } from 'express';

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

  list(_: Request, res: Response): Promise<Response> {
    return this.listOwnerService.execute()
      .then(response => res.json(response))
      .catch(err => this.requestError(err, res));
  };

  show({ params }: Request, res: Response): Promise<Response> {
    return this.showOwnerEstablishmentService.execute(Number(params.id))
      .then(response => res.json(response))
      .catch(err => this.requestError(err, res));
  };

  create({ body, client }: Request, res: Response): Promise<Response> {
    return this.createOwnerService.execute({ ...body, created_by_id: client.id })
      .then(response => res.status(201).json(response))
      .catch(err => this.requestError(err, res));
  };

  update({ body }: Request, res: Response): Promise<Response> {
    return this.updateOwnerService.execute(body)
      .then(response => res.status(201).json(response))
      .catch(err => this.requestError(err, res));
  };
};
