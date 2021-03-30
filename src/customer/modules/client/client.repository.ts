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

  async findByUserId(id: string) {
    try {
      return this.find({
        where: { id },
        relations: ['image'],
        select: ['name', 'email', 'cpf', 'cellphone', 'image'],
      });
    } catch (err) {
      return [];
    }
  }
}

export default ClientRepository;
