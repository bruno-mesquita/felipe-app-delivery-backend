import { EntityRepository, Repository } from 'typeorm';

import Client from '../entity';

@EntityRepository(Client)
class UserRepository extends Repository<Client> {
  async findOneByEmailOrCpf(email: string, cpf: string) {
    return this.findOne({ where: [{ email }, { cpf }] });
  }
}

export default UserRepository;
