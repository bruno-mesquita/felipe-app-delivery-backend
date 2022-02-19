import ApiError from '@shared/utils/ApiError';

import NeighborhoodRepository from '../neighborhood.repository';
import type { IDeleteNeighborhood } from '../dtos';

export class DeleteNeighborhoodService {
  private readonly neighborhoodRepository: NeighborhoodRepository;

  constructor() {
    this.neighborhoodRepository = new NeighborhoodRepository();
  }

  async execute(model: IDeleteNeighborhood): Promise<void> {
    try {
      await this.neighborhoodRepository.deleteOne(model);
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
