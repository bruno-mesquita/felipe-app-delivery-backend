import type { Request, Response } from 'express';

import Controller from '@shared/utils/controller';

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

export class MenuController extends Controller {
  constructor() {
    super(['create', 'list', 'findOne', 'update', 'delete']);
  }

  async create({ client, body }: Request, res: Response): Promise<Response> {
    try {
      const sanitizedValues = createMenuValidate({ ...body, establishmentId: client.entity.getEstablishmentId() });

      const menuService = new CreateMenuService();

      const menu = await menuService.execute(sanitizedValues);

      return res.status(201).json(menu);
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const menuService = new ListMenuService();

      const establishmentId = req.client.entity.getEstablishmentId();

      const menu = await menuService.execute(establishmentId);

      return res.json(menu);
    } catch (err) {
      return this.requestError(err, res);
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

      const menu = await menuService.execute(sanitizedValues);

      return res.json(menu);
    } catch (err) {
      return this.requestError(err, res);
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
      return this.requestError(err, res);
    }
  }
}
