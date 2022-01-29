import User from '@core/schemas/user.schema';
import { createPagination } from '@shared/utils/use-page';
import ApiError from '@shared/utils/ApiError';

export class ListCityManaganersService {
  async execute(page: number): Promise<any[]> {
    const { limit, offset } = createPagination(page);

    try {
      const users = await User.aggregate([
        { $match: { roles: ['CityManager'] } },
        {
          $lookup: {
            from: 'cities',
            let: { cityId: '$city' },
            pipeline: [
              { $match: { $expr: { $eq: ['$_id', '$$cityId'] }}},
              { $project: { name: 1, state: 1 } },
              {
                $lookup: {
                  from: 'states',
                  let: { stateId: '$state' },
                  pipeline: [
                    { $match: { $expr: { $eq: ['$_id', '$$stateId'] }}},
                    { $project: { name: 1 } },
                  ],
                  as: 'state',
                }
              },
              { $unwind: '$state' },
            ],
            as: 'city'
          }
        },
        { $unwind: '$city' },
        { $project: { _id: 1, name: 1, email: 1, cellphone: 1, active: 1, city: 1, } },
        { $skip: offset },
        { $limit: limit }
      ]);

      return users;
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    };
  };
};
