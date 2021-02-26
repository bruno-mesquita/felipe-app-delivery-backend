import { getCustomRepository } from 'typeorm';

import Client from 'src/core/client';
import ClientRepository from '@customer/modules/client/client.repository';

class ListClientService {
  public async execute(): Promise<Client[]> {
    const clientsRepository = getCustomRepository(ClientRepository);

    const clients = clientsRepository.find();

    return clients;
  }
}

export default ListClientService;
