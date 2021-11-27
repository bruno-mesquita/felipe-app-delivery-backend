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
  async create({ body, client }: Request, res: Response): Promise<Response> {
    try {
      const clientAddressService = new CreateAddressClientService();

      const clientAddress = await clientAddressService.execute({ ...body, userId: client.id });

      if (clientAddress.err) throw new Error(clientAddress.err);

      return res.status(201).json(clientAddress);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async list({ client, query }: Request, res: Response): Promise<Response> {
    try {
      const listAddressClientService = new ListAddressClientService();

      const clientAddress = await listAddressClientService.execute(client.id, Number(query.page || 0));

      if (clientAddress.err) throw new Error(clientAddress.err);

      return res.json(clientAddress);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async findOne({ params, client }: Request, res: Response): Promise<Response> {
    try {
      const findOneAddressClientService = new FindOneAddressClientService();

      const result = await findOneAddressClientService.execute(Number(params.id), client.id);

      if (result.err) throw new Error(result.err);

      return res.json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async deactivate({ params, client }: Request, res: Response): Promise<Response> {
    try {
      const deactivateAddressClientService = new DeactivateAddressClientService();

      const result = await deactivateAddressClientService.execute(Number(params.id), client.id);

      if (result.err) throw new Error(result.err);

      return res.json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async active({ params, client }: Request, res: Response): Promise<Response> {
    try {
      const activeAddressClientService = new ActiveAddressClientService();

      const result = await activeAddressClientService.execute(Number(params.id), client.id);

      if (result.err) throw new Error(result.err);

      return res.json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async update({ body, params }: Request, res: Response): Promise<Response> {
    try {
      const updateAddressClientService = new UpdateAddressClientService();

      const clientAddress = await updateAddressClientService.execute({ ...body, id: params.id });

      if (clientAddress.err) throw new Error(clientAddress.err);

      return res.json(clientAddress);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async delete({ params }: Request, res: Response): Promise<Response> {
    try {
      const { addressClientId } = params;
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
