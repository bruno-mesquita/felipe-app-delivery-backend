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

  async findByCpf(cpf: string) {
    return this.findOne({ where: { cpf } });
  }

  async findByCellphone(cellphone: string) {
    return this.findOne({ where: { cellphone } });
  }

  async findByProfile(id: string) {
    try {
      return this.findOne({
        where: { id },
        relations: ['image'],
      });
    } catch (err) {
      return null;
    }
  }
}

export default ClientRepository;
