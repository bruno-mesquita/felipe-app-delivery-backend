import City from '@core/city';
import { Deliveryman } from '@core/deliveryman';
import State from '@core/state';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';

export class ListDeliverymanService {
  async execute(): Promise<ServiceResponse<Deliveryman[]>> {
    try {
      const data = await Deliveryman.findAll({
        include: [
          {
            model: City,
            as: 'city',
            attributes: ['id', 'name'],
            include: [
              {
                model: State,
                as: 'state',
                attributes: ['id', 'name'],
              },
            ],
          },
        ],
      });

      return { err: null, result: data };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
