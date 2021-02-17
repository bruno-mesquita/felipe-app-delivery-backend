import { EntityRepository, Repository } from 'typeorm';
import Client from '../entity';

@EntityRepository(Client)
class ClientRepository extends Repository<Client> {
  public async findOneByEmailOrCpf(email: string, cpf: string) {
    // return this.findOne({ where: [{ email }, { cpf }] });
    const clientX = await this.findOne({
      where: {
        email,
        cpf,
      },
    });

    return clientX;
  }

  async findById(clientId: string) {
    return this.findOne({ where: { id: clientId } });
  }
}

export default ClientRepository;
