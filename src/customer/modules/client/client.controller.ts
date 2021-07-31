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

      const result = await activeClientService.execute(req.client.id);

      if (result.err) throw new Error(result.err);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async deactivate(req: Request, res: Response): Promise<Response> {
    try {
      const deactiveteClientService = new DeactiveteClientService();

      const result = await deactiveteClientService.execute(req.client.entity);

      if (result.err) throw new Error(result.err);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async updateProfile(req: Request, res: Response): Promise<Response> {
    try {
      const updateProfileService = new UpdateProfileService();

      const result = await updateProfileService.execute({ ...req.body, id: req.client.id });

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

  async remove(req: Request, res: Response): Promise<Response> {
    try {
      const deleteClientService = new DeleteClientService();

      const result = await deleteClientService.execute(req.client.entity);

      if (result.err) throw new Error(result.err);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export default ClientController;
