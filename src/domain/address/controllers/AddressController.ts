import { Request, Response } from 'express';
import CreateAddressService from '../services/createAddressService';

export default class AddressController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { street, number, neighborhood, city, cep } = request.body;

    const createAddress = new CreateAddressService();

    console.log(createAddress);

    const address = await createAddress.execute({
      street,
      number,
      neighborhood,
      city,
      cep,
    });

    return response.json(address);
  }
}
