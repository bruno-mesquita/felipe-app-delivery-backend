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
} from './services';

class ClientController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const createClientService = new CreateClientService();

      const result = await createClientService.execute(req.body);

      if (result.err) throw new Error(result.err);

      return res.status(201).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async activate(req: Request, res: Response): Promise<Response> {
    try {
      const activeClientService = new ActiveClientService();

      const result = await activeClientService.execute(req.body.code, req.body.id);

      if (result.err) throw new Error(result.err);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async updateProfile(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const updateProfileService = new UpdateProfileService();

      const result = await updateProfileService.execute({ ...req.body, id });

      if (result.err) throw new Error(result.err);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async updatePassword(req: Request, res: Response): Promise<Response> {
    try {
      const updatePasswordClientService = new UpdatePasswordClientService();

      const result = await updatePasswordClientService.execute({ ...req.body, id: req.client.id });

      if (result.err) throw new Error(result.err);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async profile(req: Request, res: Response): Promise<Response> {
    try {
      const profileClientService = new ProfileClientService();

      const profile = await profileClientService.execute(req.client.id, req.body.selects);

      if (profile.err) throw new Error(profile.err);

      return res.status(200).json(profile);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async listOrdersByClient(req: Request, res: Response): Promise<Response> {
    try {
      const listOrdersService = new ListOrdersService();

      const result = await listOrdersService.execute(req.client.id);

      if (result.err) throw new Error(result.err);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export default ClientController;
