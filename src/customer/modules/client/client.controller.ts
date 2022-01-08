/**
 * @fileoverview Controller do cliente
 *
 * @author Bruno Mesquita
 */

import { Request, Response } from 'express';

import Controller from '@shared/utils/controller';

import {
  ActiveClientService,
  CreateClientService,
  UpdateProfileService,
  UpdatePasswordClientService,
  ProfileClientService,
  ListOrdersService,
  DeleteClientService,
  DeactiveteClientService,
} from './services';

import {
  createClientValidate,
  updateClientValidate,
  updatePasswordValidate,
  profileClientValidate,
  activateClientValidate,
  listOrdersClientValidate,
} from './validation';

class ClientController extends Controller {
  private readonly createClientService: CreateClientService;
  private readonly activeClientService: ActiveClientService;
  private readonly updateProfileService: UpdateProfileService;
  private readonly updatePasswordClientService: UpdatePasswordClientService;
  private readonly profileClientService: ProfileClientService;
  private readonly listOrdersService: ListOrdersService;
  private readonly deleteClientService: DeleteClientService;
  private readonly deactiveteClientService: DeactiveteClientService;

  constructor() {
    super();

    this.createClientService = new CreateClientService();
    this.activeClientService = new ActiveClientService();
    this.updateProfileService = new UpdateProfileService();
    this.updatePasswordClientService = new UpdatePasswordClientService();
    this.profileClientService = new ProfileClientService();
    this.listOrdersService = new ListOrdersService();
    this.deleteClientService = new DeleteClientService();
    this.deactiveteClientService = new DeactiveteClientService();

    this.create = this.create.bind(this);
    this.activate = this.activate.bind(this);
    this.deactivate = this.deactivate.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.profile = this.profile.bind(this);
    this.listOrdersByClient = this.listOrdersByClient.bind(this);
    this.remove = this.remove.bind(this);
  }

  async create({ body }: Request, res: Response): Promise<Response> {
    try {
      const sanitizedBody = createClientValidate(body);

      return res.status(201).json(await this.createClientService.execute(sanitizedBody));
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async activate({ body }: Request, res: Response): Promise<Response> {
    try {
      const sanitizedBody = activateClientValidate(body);

      await this.activeClientService.execute(sanitizedBody);

      return res.status(204).json();
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async deactivate({ client }: Request, res: Response): Promise<Response> {
    try {
      return res.json(await this.deactiveteClientService.execute(client.entity));
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async updateProfile({ body, client }: Request, res: Response): Promise<Response> {
    try {
      const sanitizedValues = updateClientValidate({ ...body, id: client.id });

      return res.json(await this.updateProfileService.execute(sanitizedValues));
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async updatePassword({ body, client }: Request, res: Response): Promise<Response> {
    try {
      const sanitizedValues = updatePasswordValidate({ ...body, id: client.id });

      return res.json(await this.updatePasswordClientService.execute(sanitizedValues));
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async profile({ client, body }: Request, res: Response): Promise<Response> {
    try {
      const sanitizedValues = profileClientValidate({ id: client.id, selects: body.selects });

      return res.json(await this.profileClientService.execute(sanitizedValues));
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async listOrdersByClient({ client, query }: Request, res: Response): Promise<Response> {
    try {
      const values = listOrdersClientValidate({ clientId: client.id, page: Number(query.page) || 0 });

      return res.json(await this.listOrdersService.execute(values));
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async remove({ client }: Request, res: Response): Promise<Response> {
    try {
      return res.json(await this.deleteClientService.execute(client.entity));
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}

export default new ClientController();
