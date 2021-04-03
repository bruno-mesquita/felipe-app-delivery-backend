import Client from 'src/core/client';

class ListClientService {
  public async execute(): Promise<Client[]> {

    const clients = clientsRepository.find();

    return clients;
  }
}

export default ListClientService;
