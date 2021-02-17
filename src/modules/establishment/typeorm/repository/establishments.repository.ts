import { EntityRepository, Repository } from 'typeorm';
import Establishment from '../entity';

@EntityRepository(Establishment)
class EstablishmentRepository extends Repository<Establishment> {
  public async findById(id: string): Promise<Establishment | undefined> {
    const establishment = this.findOne({
      where: {
        id,
      },
    });

    return establishment;
  }

  public async findByName(name: string): Promise<Establishment | undefined> {
    const establishment = this.findOne({
      where: {
        name,
      },
    });

    return establishment;
  }

  public async findByEmail(email: string): Promise<Establishment | undefined> {
    const establishment = this.findOne({
      where: {
        email,
      },
    });

    return establishment;
  }

  public async findByCellphone(cellphone: string): Promise<Establishment | undefined> {
    const establishment = this.findOne({
      where: {
        cellphone,
      },
    });

    return establishment;
  }
}

export default EstablishmentRepository;
