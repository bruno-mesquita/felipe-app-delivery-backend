import { EntityRepository, Repository } from 'typeorm';

import Image from '@core/image';

@EntityRepository(Image)
class ImageRepository extends Repository<Image> {}

export default ImageRepository;
