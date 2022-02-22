import type { Request, Response } from 'express';

import {
  UpdateProfileService,
  ProfileEstablishmentService,
  DeactiveAccountService,
  CreateEstablishmentService,
  ExistsEstablishmentService,
} from './services';

export class EstabishmentController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const createEstablishmentService = new CreateEstablishmentService();

      const establishment = await createEstablishmentService.execute({ ...req.body, userId: req.client.id });

      if (establishment.err) throw new Error(establishment.err);

      return res.status(201).json(establishment);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async updateProfile(req: Request, res: Response): Promise<Response> {
    try {
      const updateProfileService = new UpdateProfileService();

      const result = await updateProfileService.execute({ ...req.body, userId: req.client.id });

      if (result.err) throw new Error(result.err);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async profile(req: Request, res: Response): Promise<Response> {
     try {
      const profileEstablishmentService = new ProfileEstablishmentService();

      const profile = await profileEstablishmentService.execute(req.body.selects, req.client.id);

      if (profile.err) throw new Error(profile.err);

      return res.status(200).json(profile);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async deactiveAccount(req: Request, res: Response): Promise<Response> {
    try {
      const deactivateAccount = new DeactiveAccountService();

      const deactive = await deactivateAccount.execute(req.client.id);

      if (deactive.err) throw new  Error(deactive.err);

      return res.status(200).json(deactive);
    }catch(err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async exists(req: Request, res: Response): Promise<Response> {
    try {
      const existsEstablishmentService = new ExistsEstablishmentService();

      const result = await existsEstablishmentService.execute(req.client.id);

      if (result.err) throw new  Error(result.err);

      return res.json(result);
    }catch(err) {
      return res.status(400).json({ err: err.message });
    }
  }
}
