import type { Request, Response } from 'express';

import Controller from '@shared/utils/controller';

import {
  CreateAddressClientService,
  ListAddressClientService,
  DeleteAddressClientService,
  UpdateAddressClientService,
  FindOneAddressClientService,
} from './services';

import { createAddressClientValidate, updateAddressClientValidate } from './validations';

class ClientAddressController extends Controller {
  private readonly createAddressClientService: CreateAddressClientService;
  private readonly listAddressClientService: ListAddressClientService;
  private readonly deleteAddressClientService: DeleteAddressClientService;
  private readonly updateAddressClientService: UpdateAddressClientService;
  private readonly findOneAddressClientService: FindOneAddressClientService;

  constructor() {
    super();

    this.createAddressClientService = new CreateAddressClientService();
    this.listAddressClientService = new ListAddressClientService();
    this.deleteAddressClientService = new DeleteAddressClientService();
    this.updateAddressClientService = new UpdateAddressClientService();
    this.findOneAddressClientService = new FindOneAddressClientService();

    this.create = this.create.bind(this);
    this.list = this.list.bind(this);
    this.findOne = this.findOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create({ body, client }: Request, res: Response): Promise<Response> {
    try {
      const values = createAddressClientValidate({ ...body, userId: client.id });

      await this.createAddressClientService.execute(values);

      return res.status(201).json();
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async list({ client, query }: Request, res: Response): Promise<Response> {
    try {
      return res.json(await this.listAddressClientService.execute(client.id, Number(query.page || 0)));
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async findOne({ params, client }: Request, res: Response): Promise<Response> {
    try {
      return res.json(await this.findOneAddressClientService.execute(Number(params.id), client.id));
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async update({ body, params }: Request, res: Response): Promise<Response> {
    try {
      const values = updateAddressClientValidate({ ...body, id: params.id });

      await this.updateAddressClientService.execute(values);

      return res.status(204).json();
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async delete({ params }: Request, res: Response): Promise<Response> {
    try {
      const { addressClientId } = params;

      return res.json(await this.deleteAddressClientService.execute(Number(addressClientId)));
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export default ClientAddressController;
