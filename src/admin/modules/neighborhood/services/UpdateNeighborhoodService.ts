import ApiError from '@shared/utils/ApiError';

import NeighborhoodRepository from '../neighborhood.repository';
import type { IUpdateNeighborhood } from '../dtos';

export class UpdateNeighborhoodService {
  private readonly neighborhoodRepository: NeighborhoodRepository;

  constructor() {
    this.neighborhoodRepository = new NeighborhoodRepository();
  }

  async execute(model: IUpdateNeighborhood): Promise<void> {
    try {
      await this.neighborhoodRepository.updateOne(model);
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
