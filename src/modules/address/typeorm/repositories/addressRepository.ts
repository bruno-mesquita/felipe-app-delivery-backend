import { EntityRepository, Repository } from 'typeorm';
import Address from '../entities/address.entity';

@EntityRepository(Address)
export default class AddressRepository extends Repository<Address> {
  public async findById(id: string): Promise<Address | undefined> {
    const address = await this.findOne({
      where: {
        id,
      },
    });

    return address;
  }

  public async findByCep(cep: number): Promise<Address | undefined> {
    const address = await this.findOne({
      where: {
        cep,
      },
    });

    return address;
  }

  public async findByNeighborhood(
    neighborhood: string
  ): Promise<Address | undefined> {
    const address = await this.findOne({
      where: {
        neighborhood,
      },
    });

    return address;
  }

  public async findByCity(city: string): Promise<Address | undefined> {
    const address = await this.findOne({
      where: {
        city,
      },
    });

    return address;
  }
}
