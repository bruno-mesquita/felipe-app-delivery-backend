import { EntityRepository, Repository } from 'typeorm';

import Establishment from '@core/establishment';

@EntityRepository(Establishment)
class EstablishmentRepository extends Repository<Establishment> {
  async findById(id: string) {
    return this.findOne({ where: { id } });
  }
}

export { EstablishmentRepository };
