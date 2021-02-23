/**
 * @fileoverview Controller do estabelecimento Admin
 *
 * @author Jonatas Rosa Moura
 */

import { Request, Response } from 'express';

import CreateEstablishmentService from '../services/create-establishment-service/create-establishment.service';
import ListEstablishmentService from '../services/list-establishment-service/list-establishment.service';
import ShowEstablishmentService from '../services/show-establishment-service/show-establishment.service';

import UpdateProfileEstablishmentService from '../services/update-profile-service/update-profile.service';

class EstablishmentController {
  async list(req: Request, res: Response): Promise<Response> {
    try {
      const listEstablishmentService = new ListEstablishmentService();

      if (!listEstablishmentService) throw new Error('Não encontrado.');

      const establishment = await listEstablishmentService.execute();

      return res.status(200).json(establishment);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async show(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const showEstablishmentService = new ShowEstablishmentService();

      if (!showEstablishmentService) throw new Error('Estabelecimento não encontrado.');

      const establishment = await showEstablishmentService.execute({ id });

      if (!id) throw new Error('Estabelecimeto inválido.');

      if (!establishment) throw new Error('Erro ao tentar achar o Estabelecimento.');

      return res.status(200).json(establishment);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

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
      const { id } = req.params;
      const updateProfileService = new UpdateProfileEstablishmentService();

      const updateProfileEstablishment = await updateProfileService.execute({ ...req.body, id });

      if (updateProfileEstablishment.err) throw new Error(updateProfileEstablishment.err);

      return res.status(200).json(updateProfileEstablishment);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export default EstablishmentController;
