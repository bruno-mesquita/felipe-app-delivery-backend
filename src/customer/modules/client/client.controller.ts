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
} from './validation';

class ClientController extends Controller {
  constructor() {
    super();
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

      const createClientService = new CreateClientService();

      const result = await createClientService.execute(sanitizedBody);

      return res.status(201).json(result);
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async activate({ body }: Request, res: Response): Promise<Response> {
    try {
      const sanitizedBody = activateClientValidate(body);

      const activeClientService = new ActiveClientService();

      await activeClientService.execute(sanitizedBody);

      return res.status(204).json();
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async deactivate({ client }: Request, res: Response): Promise<Response> {
    try {
      const deactiveteClientService = new DeactiveteClientService();

      const result = await deactiveteClientService.execute(client.entity);

      if (result.err) throw new Error(result.err);

      return res.status(200).json(result);
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async updateProfile({ body, client }: Request, res: Response): Promise<Response> {
    try {
      const sanitizedValues = updateClientValidate({ ...body, id: client.id });

      const updateProfileService = new UpdateProfileService();

      const result = await updateProfileService.execute(sanitizedValues);

      if (result.err) throw new Error(result.err);

      return res.status(200).json(result);
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async updatePassword({ body, client }: Request, res: Response): Promise<Response> {
    try {
      const sanitizedValues = updatePasswordValidate({ ...body, id: client.id });

      const updatePasswordClientService = new UpdatePasswordClientService();

      const result = await updatePasswordClientService.execute(sanitizedValues);

      if (result.err) throw new Error(result.err);

      return res.status(200).json(result);
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async profile({ client, body }: Request, res: Response): Promise<Response> {
    try {
      const sanitizedValues = profileClientValidate({ id: client.id, selects: body.selects });

      const profileClientService = new ProfileClientService();

      const profile = await profileClientService.execute(sanitizedValues);

      if (profile.err) throw new Error(profile.err);

      return res.status(200).json(profile);
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async listOrdersByClient({ client }: Request, res: Response): Promise<Response> {
    try {
      const listOrdersService = new ListOrdersService();

      const result = await listOrdersService.execute(client.id);

      if (result.err) throw new Error(result.err);

      return res.status(200).json(result);
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async remove({ client }: Request, res: Response): Promise<Response> {
    try {
      const deleteClientService = new DeleteClientService();

      const result = await deleteClientService.execute(client.entity);

      if (result.err) throw new Error(result.err);

      return res.status(200).json(result);
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}

export default new ClientController();
