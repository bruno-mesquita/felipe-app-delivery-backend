import Freight from '@core/Freight';
import Neighborhood from '@core/neighborhood';
import ApiError from '@shared/utils/ApiError';

type IRequest = {
  establishmentId: number;
};

export class ListFreightsService {
  async execute({ establishmentId }: IRequest): Promise<Freight[]> {
    try {
      return Freight.findAll({
        where: { establishmentId },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [
          {
            model: Neighborhood,
            as: 'neighborhood',
            attributes: ['name'],
          },
        ],
      });
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
