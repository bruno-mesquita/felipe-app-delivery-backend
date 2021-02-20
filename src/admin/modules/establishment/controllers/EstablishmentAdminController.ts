/**
 * @fileoverview Controller do estabelecimento Admin
 *
 * @author Jonatas Rosa Moura
 */

import { Request, Response } from 'express';

import CreateEstablishmentService from '../services/create-establishment-service/create-establishment.service';

import UpdateProfileEstablishmentService from '../services/update-profile-service/update-profile.service';

class EstablishmentController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const createEstablishmentService = new CreateEstablishmentService();

      const establishment = await createEstablishmentService.execute(req.body);

      if (establishment.err) throw new Error(establishment.err);

      return res.status(201).json(establishment);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async updateProfile(req: Request, res: Response): Promise<Response> {
    try {
      const updateProfileService = new UpdateProfileEstablishmentService();

      const updateProfileEstablishment = await updateProfileService.execute(req.body);

      if (updateProfileEstablishment.err) throw new Error(updateProfileEstablishment.err);

      return res.status(200).json(updateProfileEstablishment);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export default EstablishmentController;
