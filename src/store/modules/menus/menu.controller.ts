import type { Request, Response } from 'express';

import Controller from '@shared/utils/controller';

import { CreateMenuService, DeleteMenuService, ListMenuService, UpdateMenuService, GetMenuService } from './services';

import { createMenuValidate, updateMenuValidate, deleteMenuValidate, findOneMenuValidate } from './validations';

export class MenuController extends Controller {
  constructor() {
    super(['create', 'list', 'findOne', 'update', 'delete']);
  }

  async create({ client, body }: Request, res: Response): Promise<Response> {
    try {
      const sanitizedValues = createMenuValidate({
        ...body,
        establishmentId: client.entity.getEstablishmentId(),
      });

      const menuService = new CreateMenuService();

      const result = await menuService.execute(sanitizedValues);

      return res.status(201).json(result);
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async list({ client, query }: Request, res: Response): Promise<Response> {
    try {
      const menuService = new ListMenuService();

      const menus = await menuService.execute({
        establishmentId: client.entity.getEstablishmentId(),
        page: Number(query.page) || 1,
      });

      return res.json(menus);
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async findOne({ params, client }: Request, res: Response): Promise<Response> {
    try {
      const sanitizedValues = findOneMenuValidate({
        id: Number(params.id),
        establishmentId: client.entity.getEstablishmentId(),
      });

      const menuService = new GetMenuService();

      const menu = await menuService.execute(sanitizedValues);

      return res.json(menu);
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async update({ params, body, client }: Request, res: Response): Promise<Response> {
    try {
      const sanitizedValues = updateMenuValidate({
        id: Number(params.id),
        establishmentId: client.entity.getEstablishmentId(),
        ...body,
      });

      const menuService = new UpdateMenuService();

      await menuService.execute(sanitizedValues);

      return res.status(204).json({});
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async delete({ params, client }: Request, res: Response): Promise<Response> {
    try {
      const sanitizedValues = deleteMenuValidate({
        id: Number(params.id),
        establishmentId: client.entity.getEstablishmentId(),
      });

      const menuService = new DeleteMenuService();

      await menuService.execute(sanitizedValues);

      return res.status(204).json({});
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}
