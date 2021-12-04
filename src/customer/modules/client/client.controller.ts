/**
 * @fileoverview Controller do cliente
 *
 * @author Bruno Mesquita
 */

import { Request, Response } from 'express';

import ApiError from '@shared/utils/ApiError';

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

import {
  createClientValidate,
  updateClientValidate,
  updatePasswordClientValidate,
  profileClientValidate,
} from './validation/';

class ClientController {
  async create({ body }: Request, res: Response): Promise<Response> {
    try {
      const sanitizedBody = createClientValidate(body);

      const createClientService = new CreateClientService();

      const result = await createClientService.execute(sanitizedBody);

      return res.status(201).json(result);
    } catch (err) {
      if(err instanceof ApiError) {
        return res.status(err.statusCode).json(err);
      }
      return res.status(500).json({ message: 'Erro no servidor' });
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
      const sanitizedValues = updateClientValidate({ ...body, id: client.id });

      const updateProfileService = new UpdateProfileService();

      const result = await updateProfileService.execute(sanitizedValues);

      if (result.err) throw new Error(result.err);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async updatePassword({ body, client }: Request, res: Response): Promise<Response> {
    try {
      const sanitizedValues = updatePasswordClientValidate({ ...body, id: client.id });

      const updatePasswordClientService = new UpdatePasswordClientService();

      const result = await updatePasswordClientService.execute(sanitizedValues);

      if (result.err) throw new Error(result.err);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
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
