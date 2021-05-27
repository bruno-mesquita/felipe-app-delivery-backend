/**
 * @fileoverview Controller do estabelecimento Admin
 *
 * @author Jonatas Rosa Moura
 */

import { Request, Response } from 'express';

import { ListEstablishmentService } from './services';
import ShowEstablishmentService from './services/show-establishment-service/show-establishment.service';

import UpdateProfileEstablishmentService from './services/update-profile-service/update-profile.service';

class EstablishmentController {
  async show(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const showEstablishmentService = new ShowEstablishmentService();

      const establishment = await showEstablishmentService.execute(Number(id));

      if (establishment.err) throw new Error(establishment.err);

      return res.status(200).json(establishment);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async updateProfile(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const updateProfileService = new UpdateProfileEstablishmentService();

      const updateProfileEstablishment = await updateProfileService.execute({ ...req.body, id });

      if (updateProfileEstablishment.err) throw new Error(updateProfileEstablishment.err);

      return res.status(200).json(updateProfileEstablishment);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const listEstablishmentService = new ListEstablishmentService();

      const updateProfileEstablishment = await listEstablishmentService.execute();

      if (updateProfileEstablishment.err) throw new Error(updateProfileEstablishment.err);

      return res.status(200).json(updateProfileEstablishment);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export default EstablishmentController;
