import { Request, Response } from 'express';

import {
  CreateAddressClientService,
  ListAddressClientService,
  DeleteAddressClientService,
  UpdateAddressClientService,
  FindOneAddressClientService,
} from './services';

import { createAddressClientValidate, updateAddressClientValidate } from './validations';

class ClientAddressController {
  async create({ body, client }: Request, res: Response): Promise<Response> {
    try {
      const values = createAddressClientValidate({ ...body, userId: client.id });

      const clientAddressService = new CreateAddressClientService();

      await clientAddressService.execute(values);

      return res.status(201).json();
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

  async update({ body, params }: Request, res: Response): Promise<Response> {
    try {
      const values = updateAddressClientValidate({ ...body, id: params.id });

      const updateAddressClientService = new UpdateAddressClientService();

      await updateAddressClientService.execute(values);

      return res.status(204).json();
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

export default ClientAddressController;
