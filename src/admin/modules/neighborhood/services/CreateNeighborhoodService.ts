import ApiError from '@shared/utils/ApiError';

import NeighborhoodRepository from '../neighborhood.repository';
import type { ICreateNeighborhood } from '../dtos';

export class CreateNeighborhoodService {
  private readonly neighborhoodRepository: NeighborhoodRepository;

  constructor() {
    this.neighborhoodRepository = new NeighborhoodRepository();
  }

  async execute(
    model: ICreateNeighborhood | ICreateNeighborhood[]
  ): Promise<number | void> {
    try {
      if (Array.isArray(model))
        return this.neighborhoodRepository.createMany(model);

      return this.neighborhoodRepository.create(model);
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
