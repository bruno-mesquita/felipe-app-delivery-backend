import { EntityRepository, Repository } from 'typeorm';

import Avatar from '@core/image';

@EntityRepository(Avatar)
class AvatarRepository extends Repository<Avatar> {
  async findById(id: string) {
    return this.findOne({ where: { id } });
  }
}

export { AvatarRepository };
