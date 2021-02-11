import { EntityRepository, Repository } from 'typeorm';
import StateAddress from '../entities/stateAddress.entity';

@EntityRepository(StateAddress)
export default class UserTokensRepository extends Repository<StateAddress> {
  public async findByState(state: string): Promise<StateAddress | undefined> {
    const stateAddress = await this.findOne({
      where: {
        state,
      },
    });

    return stateAddress;
  }

  public async generate(address_id: string): Promise<StateAddress> {
    const stateAddress = await this.create({
      address_id,
    });

    await this.save(stateAddress);

    return stateAddress;
  }
}
