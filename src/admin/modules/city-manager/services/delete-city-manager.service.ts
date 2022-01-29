import User from '@core/schemas/user.schema';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';

export class DeleteCityManagerService {
  async execute(id: string): Promise<void> {
    try {
      const user = await User.findOne({ _id: id, roles: ['CityManager'], active: true });

      if (!user) throw new ApiError('Usuário não encontrado');

      await user.delete();
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    };
  };
};
