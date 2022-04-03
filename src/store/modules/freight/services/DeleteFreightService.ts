import ApiError from '@shared/utils/ApiError';

import { FreightRepository } from '../freight.repository';

type IRequest = {
  freightId: number;
};

export class DeleteFreightService {
  private freightRepository: FreightRepository;

  constructor() {
    this.freightRepository = new FreightRepository();
  }

  async execute({ freightId }: IRequest): Promise<void> {
    try {
      await this.freightRepository.deleteOne(freightId);
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
