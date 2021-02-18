import { getCustomRepository } from 'typeorm';

import Client from '@modules/client/typeorm/entity';
import ClientRepository from '@modules/client/typeorm/repository';

class ListClientService {
  public async execute(): Promise<Client[]> {
    const clientsRepository = getCustomRepository(ClientRepository);

    const clients = clientsRepository.find();

    return clients;
  }
}

export default ListClientService;
