import type { Request, Response } from 'express';

import Controller from '@shared/utils/controller';

import {
  CreateOwnerService,
  ListOwnerService,
  ShowOwnerEstablishmentService,
} from './services';

export class EstablishmentOwnerController extends Controller {
  private readonly createOwnerService: CreateOwnerService;

  private readonly listOwnerService: ListOwnerService;

  private readonly showOwnerEstablishmentService: ShowOwnerEstablishmentService;

  constructor() {
    super();

    this.createOwnerService = new CreateOwnerService();
    this.listOwnerService = new ListOwnerService();
    this.showOwnerEstablishmentService = new ShowOwnerEstablishmentService();

    this.list = this.list.bind(this);
    this.show = this.show.bind(this);
    this.create = this.create.bind(this);
  }

  async list(_: Request, res: Response): Promise<Response> {
    try {
      return res.json(await this.listOwnerService.execute());
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async show({ params }: Request, res: Response): Promise<Response> {
    try {
      const { id } = params;

      return res.json(
        await this.showOwnerEstablishmentService.execute(Number(id))
      );
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async create({ body }: Request, res: Response): Promise<Response> {
    try {
      return res.status(201).json(await this.createOwnerService.execute(body));
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}
