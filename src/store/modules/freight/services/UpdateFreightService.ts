import type { IFreightAttributes } from '@core/Freight';
import ApiError from '@shared/utils/ApiError';

import { FreightRepository } from '../freight.repository';

type IRequest = Partial<Omit<IFreightAttributes, 'establishmentId'>> & {
  freightId: number;
};

export class UpdateFreightService {
  private freightRepository: FreightRepository;

  constructor() {
    this.freightRepository = new FreightRepository();
  }

  async execute(values: IRequest): Promise<void> {
    try {
      await this.freightRepository.updateOne(values);
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
