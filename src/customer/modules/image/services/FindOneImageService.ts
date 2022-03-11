import ApiError from '@shared/utils/ApiError';
import ImageRepository from '../image.repository';

export class FindOneImageService {
  private readonly imageRepository: ImageRepository;

  constructor() {
    this.imageRepository = new ImageRepository();
  }

  async execute(imageId: number) {
    try {
      return this.imageRepository.findOne(imageId);
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
