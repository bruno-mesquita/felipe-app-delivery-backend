import { EntityRepository, Repository } from 'typeorm';

import Client from '@core/client';

@EntityRepository(Client)
class ClientRepository extends Repository<Client> {
  async findById(id: string) {
    return this.findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.findOne({ where: { email } });
  }
}

export default ClientRepository;
