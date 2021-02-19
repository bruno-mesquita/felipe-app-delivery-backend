import { EntityRepository, Repository } from 'typeorm';
import Establishment from '@core/establishment';

@EntityRepository(Establishment)
export class EstablishmentRepository extends Repository<Establishment> {
  async findById(id: string): Promise<Establishment | undefined> {
    const establishment = this.findOne({
      where: {
        id,
      },
    });

    return establishment;
  }

  async findByEmail(email: string): Promise<Establishment | undefined> {
    const establishment = this.findOne({
      where: {
        email,
      },
    });

    return establishment;
  }

  async findByCellphone(cellphone: string): Promise<Establishment | undefined> {
    const establishment = this.findOne({
      where: {
        cellphone,
      },
    });

    return establishment;
  }
}
