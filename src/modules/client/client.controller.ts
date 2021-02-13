/**
 * @fileoverview Controller do cliente
 *
 * @author Bruno Mesquita
 */

import { Request, Response } from 'express';

import { ActiveClientService, CreateClientService, UpdateProfileService } from './services';

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

      return res.status(201).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async updateProfile(req: Request, res: Response): Promise<Response> {
    try {
      const updateProfileService = new UpdateProfileService();

      const result = await updateProfileService.execute(req.body);

      if (result.err) throw new Error(result.err);

      return res.status(201).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export default ClientController;
