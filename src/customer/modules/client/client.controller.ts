/**
 * @fileoverview Controller do cliente
 *
 * @author Bruno Mesquita
 */

import { Request, Response } from 'express';

import {
  ActiveClientService,
  CreateClientService,
  UpdateProfileService,
  UpdatePasswordClientService,
  ProfileClientService,
  ListOrdersService,
  DeleteClientService,
  DeactiveteClientService
} from './services';

class ClientController {
  async create({ body }: Request, res: Response): Promise<Response> {
    try {
      const createClientService = new CreateClientService();

      const result = await createClientService.execute(body);

      if (result.err) throw new Error(result.err);

      return res.status(201).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async activate({ client }: Request, res: Response): Promise<Response> {
    try {
      const activeClientService = new ActiveClientService();

      const result = await activeClientService.execute(client.id);

      if (result.err) throw new Error(result.err);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async deactivate({ client }: Request, res: Response): Promise<Response> {
    try {
      const deactiveteClientService = new DeactiveteClientService();

      const result = await deactiveteClientService.execute(client.entity);

      if (result.err) throw new Error(result.err);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async updateProfile({ body, client }: Request, res: Response): Promise<Response> {
    try {
      const updateProfileService = new UpdateProfileService();

      const result = await updateProfileService.execute({ ...body, id: client.id });

      if (result.err) throw new Error(result.err);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async updatePassword({ body, client }: Request, res: Response): Promise<Response> {
    try {
      const updatePasswordClientService = new UpdatePasswordClientService();

      const result = await updatePasswordClientService.execute({ ...body, id: client.id });

      if (result.err) throw new Error(result.err);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async profile({ client, body }: Request, res: Response): Promise<Response> {
    try {
      const profileClientService = new ProfileClientService();

      const profile = await profileClientService.execute(client.id, body.selects);

      if (profile.err) throw new Error(profile.err);

      return res.status(200).json(profile);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async listOrdersByClient({ client }: Request, res: Response): Promise<Response> {
    try {
      const listOrdersService = new ListOrdersService();

      const result = await listOrdersService.execute(client.id);

      if (result.err) throw new Error(result.err);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async remove({ client }: Request, res: Response): Promise<Response> {
    try {
      const deleteClientService = new DeleteClientService();

      const result = await deleteClientService.execute(client.entity);

      if (result.err) throw new Error(result.err);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export default ClientController;
