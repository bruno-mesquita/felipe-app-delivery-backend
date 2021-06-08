import { Request, Response } from 'express';

import { CreateDeliverymanService, DeleteDeliverymanService, ListDeliverymanService, UpdateDeliverymanService } from './services';

export class DeliverymanController {
  async post(req: Request, res: Response): Promise<Response> {
    try {
      const createDeliverymanService = new CreateDeliverymanService();

      const { err } = await createDeliverymanService.execute(req.client.id, req.body);

      if(err) throw new Error();

      return res.status(201).json({});
    } catch (err) {
      return res.status(400).json({ err: 'Erro ao criar' });
    }
  }

  async put(req: Request, res: Response): Promise<Response> {
    try {
      const updateDeliverymanService = new UpdateDeliverymanService();

      const id = Number(req.params.id);

      const { err } = await updateDeliverymanService.execute(req.client.id, { ...req.body, id });

      if(err) throw new Error();

      return res.status(204).json();
    } catch (err) {
      return res.status(400).json({ err: 'Erro ao atualizar' });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const listDeliverymanService = new ListDeliverymanService();

      const { err, result } = await listDeliverymanService.execute(req.client.id);

      if(err) throw new Error();

      return res.json({ result });
    } catch (err) {
      return res.status(400).json({ err: 'Erro ao listar' });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const deleteDeliverymanService = new DeleteDeliverymanService();

      const { err } = await deleteDeliverymanService.execute(req.client.id, Number(req.params.id));

      if(err) throw new Error();

      return res.status(204).json();
    } catch (err) {
      return res.status(400).json({ err: 'Erro ao deletar' });
    }
  }
}
