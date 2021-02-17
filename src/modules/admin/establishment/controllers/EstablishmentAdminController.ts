/**

 * @fileoverview Controller do estabelecimento Admin

 *

 * @author Jonatas Rosa Moura

 */

import { Request, Response } from 'express';

import CreateEstablishmentService from '../services/create-establishment-service';

class EstablishmentController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, email, cellphone, password, confirmPassword } = req.body;

    const createEstablishment = new CreateEstablishmentService();

    const establishment = await createEstablishment.execute({
      name,
      email,
      cellphone,
      password,
      confirmPassword,
    });

    return res.json(establishment);
  }
}

export default EstablishmentController;
