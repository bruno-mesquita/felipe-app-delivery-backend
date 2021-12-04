import ApiError from '@shared/utils/ApiError';
import { Request, Response } from 'express';

import {
  CreateMenuService,
  DeleteMenuService,
  ListMenuService,
  UpdateMenuService,
  GetMenuService
} from './services';

import {
  createMenuValidate,
  updateMenuValidate,
  deleteMenuValidate,
  findOneMenuValidate,
} from './validations';

export class MenuController {
  async create({ client, body }: Request, res: Response): Promise<Response> {
    try {
      const sanitizedValues = createMenuValidate({ name: body.name, establishmentId: client.entity.getEstablishmentId() });

      const menuService = new CreateMenuService();

      const menu = await menuService.execute(sanitizedValues);

      return res.status(201).json(menu);
    } catch (err) {
      if(err instanceof ApiError) {
        return res.status(err.statusCode).json(err);
      }

      return res.status(500).json({ message: 'Erro no servidor' });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const menuService = new ListMenuService();

      const establishmentId = req.client.entity.getEstablishmentId();

      if(!establishmentId) throw new Error('Id invalido ou inexistente');

      const menu = await menuService.execute(establishmentId);

      return res.json(menu);
    } catch (err) {
      if(err instanceof ApiError) {
        return res.status(err.statusCode).json(err);
      }

      return res.status(500).json({ message: 'Erro no servidor' });
    }
  }

  async findOne({ params, client }: Request, res: Response): Promise<Response> {
    try {
      const establishmentId = client.entity.getEstablishmentId();
      const { id } = params;

      const sanitizedValues = findOneMenuValidate({ id: Number(id), establishmentId });

      const menuService = new GetMenuService();

      const menu = await menuService.execute(sanitizedValues);

      return res.json(menu);
    } catch (err) {
      if(err instanceof ApiError) {
        return res.status(err.statusCode).json(err);
      }

      return res.status(500).json({ message: 'Erro no servidor' });
    }
  }

  async update({ params, body, client }: Request, res: Response): Promise<Response> {
    try {
      const sanitizedValues = updateMenuValidate({
        id: Number(params.id),
        name: body.name,
        establishmentId: client.entity.getEstablishmentId()
      });

      const menuService = new UpdateMenuService();

      const menu = await menuService.execute(sanitizedValues);

      return res.json(menu);
    } catch (err) {
      if(err instanceof ApiError) {
        return res.status(err.statusCode).json(err);
      }

      return res.status(500).json({ message: 'Erro no servidor' });
    }
  }

  async delete({ params, client }: Request, res: Response): Promise<Response> {
    try {
      const sanitizedValues = deleteMenuValidate({
        id: Number(params.id),
        establishmentId: client.entity.getEstablishmentId()
      });

      const menuService = new DeleteMenuService();

      const menu = await menuService.execute(sanitizedValues);

      return res.json(menu);
    } catch (err) {
      if(err instanceof ApiError) {
        return res.status(err.statusCode).json(err);
      }

      return res.status(500).json({ message: 'Erro no servidor' });
    }
  }
}
