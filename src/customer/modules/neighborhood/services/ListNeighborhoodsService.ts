import Neighborhood from '@core/neighborhood';
import ApiError from '@shared/utils/ApiError';

import NeighborhoodRepository from '../neighborhood.repository';

export class ListNeighborhoodsService {
  private readonly neighborhoodRepository: NeighborhoodRepository;

  constructor() {
    this.neighborhoodRepository = new NeighborhoodRepository();
  }

  async execute(cityId: number): Promise<Neighborhood[]> {
    try {
      return this.neighborhoodRepository.list(cityId);
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
