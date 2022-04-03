import Freight from '@core/Freight';
import ApiError from '@shared/utils/ApiError';
import { EstablishmentRepository } from '@store/modules/establishment';

type IRequest = {
  establishmentId: number;
};

export class ListFreightsService {
  private establishmentRepository: EstablishmentRepository;

  constructor() {
    this.establishmentRepository = new EstablishmentRepository();
  }

  async execute({ establishmentId }: IRequest): Promise<Freight[]> {
    try {
      const partner = await this.establishmentRepository.findOne(establishmentId);

      return partner.getFreights({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
