import User from '@core/schemas/user.schema';
import ApiError from '@shared/utils/ApiError';
import { Types } from 'mongoose';

export class FindOneCityManagerService {
  async execute(id: string): Promise<any> {
    try {
      const user = (await User.aggregate([
        { $match: { roles: ['CityManager'], _id: new Types.ObjectId(id) } },
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
        { $project: { _id: 1, name: 1, email: 1, cellphone: 1, active: 1, city: '$city._id', state: '$city.state._id' } },
      ]))[0] || undefined;

      if (!user) throw new ApiError('Usuário não encontrado');

      return user;
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    };
  };
};
