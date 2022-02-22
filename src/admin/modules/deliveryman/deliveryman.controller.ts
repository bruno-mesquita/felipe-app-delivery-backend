import type { Request, Response } from 'express';

import Controller from '@shared/utils/controller';
import {
  CreateDeliverymanService,
  DeleteDeliverymanService,
  ListDeliverymanService,
  UpdateDeliverymanService
} from './services';

import {
  createDeliverymanValidate,
  updateDeliverymanValidate
} from './validations';

export class DeliverymanController extends Controller  {
  constructor() {
    super();

    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.list = this.list.bind(this);
    this.delete = this.delete.bind(this);
    this.post = this.post.bind(this);
  }

  async post({ body }: Request, res: Response): Promise<Response> {
    try {
      const values = createDeliverymanValidate(body);

      const createDeliverymanService = new CreateDeliverymanService();

      const response = await createDeliverymanService.execute(values);

      return res.status(201).json(response);
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async put({ params, body }: Request, res: Response): Promise<Response> {
    try {
      const values = updateDeliverymanValidate({
        ...body,
        id: Number(params.id),
      });

      const updateDeliverymanService = new UpdateDeliverymanService();

      await updateDeliverymanService.execute(values);

      return res.status(204).json();
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async list(_: Request, res: Response): Promise<Response> {
    try {
      const listDeliverymanService = new ListDeliverymanService();

      const response = await listDeliverymanService.execute();

      return res.json(response);
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async delete({ params }: Request, res: Response): Promise<Response> {
    try {
      const deleteDeliverymanService = new DeleteDeliverymanService();

      await deleteDeliverymanService.execute(Number(params.id));

      return res.status(204).json();
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}
