import { EntityRepository, Repository } from 'typeorm';

import Client from '@core/client';

@EntityRepository(Client)
class ClientRepository extends Repository<Client> {
  public async findOneByEmailOrCpf(email: string, cpf: string) {
    return this.findOne({ where: [{ email }, { cpf }] });
  }

  async findById(clientId: string) {
    return this.findOne({ where: { id: clientId } });
  }

  async findByEmail(email: string) {
    return this.findOne({ where: { email } });
  }
}

export default ClientRepository;
