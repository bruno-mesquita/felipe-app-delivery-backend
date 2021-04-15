import { Request, Response } from 'express';

import {
  CreateAddressClientService,
  ListAddressClientService,
  DeleteAddressClientService,
  UpdateAddressClientService,
  FindOneAddressClientService,
  ActiveAddressClientService,
  DeactivateAddressClientService
} from './services';

class ClientAddressController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const clientAddressService = new CreateAddressClientService();

      const clientAddress = await clientAddressService.execute({ ...req.body, userId: req.client.id });

      if (clientAddress.err) throw new Error(clientAddress.err);

      return res.status(201).json(clientAddress);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const listAddressClientService = new ListAddressClientService();

      const clientAddress = await listAddressClientService.execute(req.client.id);

      if (clientAddress.err) throw new Error(clientAddress.err);

      return res.json(clientAddress);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const findOneAddressClientService = new FindOneAddressClientService();

      const result = await findOneAddressClientService.execute(Number(req.params.id), req.client.id);

      if (result.err) throw new Error(result.err);

      return res.json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async deactivate(req: Request, res: Response): Promise<Response> {
    try {
      const deactivateAddressClientService = new DeactivateAddressClientService();

      const result = await deactivateAddressClientService.execute(Number(req.params.id), req.client.id);

      if (result.err) throw new Error(result.err);

      return res.json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async active(req: Request, res: Response): Promise<Response> {
    try {
      const activeAddressClientService = new ActiveAddressClientService();

      const result = await activeAddressClientService.execute(Number(req.params.id), req.client.id);

      if (result.err) throw new Error(result.err);

      return res.json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const updateAddressClientService = new UpdateAddressClientService();

      const clientAddress = await updateAddressClientService.execute({ ...req.body, id: req.params.id });

      if (clientAddress.err) throw new Error(clientAddress.err);

      return res.json(clientAddress);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { addressClientId } = req.params;
      const deleteAddressClientService = new DeleteAddressClientService();

      const clientAddress = await deleteAddressClientService.execute(Number(addressClientId));

      if (clientAddress.err) throw new Error(clientAddress.err);

      return res.json(clientAddress);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export { ClientAddressController };
