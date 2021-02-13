import { EntityRepository, Repository } from 'typeorm';

import Client from '../entity';

@EntityRepository(Client)
class UserRepository extends Repository<Client> {
  async findOneByEmailOrCpf(email: string, cpf: string) {
    return this.findOne({ where: [{ email }, { cpf }] });
  }

  async findById(clientId: string) {
    return this.findOne({ where: { id: clientId } });
  }
}

export default UserRepository;
