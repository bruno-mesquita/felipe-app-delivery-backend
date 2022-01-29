import User from '@core/schemas/user.schema';
import ApiError from '@shared/utils/ApiError';

export class UpdateCityManagerService {
  async execute(values: any): Promise<void> {
    try {
      const user = await User.findOne({ _id: values._id, roles: ['CityManager'] });

      if (!user) throw new ApiError('Usuário não encontrado');

      await user.update(values);
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    };
  };
};
