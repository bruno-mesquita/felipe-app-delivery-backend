import { EntityRepository, Repository } from 'typeorm';

import Image from '@core/image';

@EntityRepository(Image)
class ImagesRepository extends Repository<Image> {
  async findById(id: string) {
    return this.findOne({ where: { id } });
  }
}

export { ImagesRepository };
