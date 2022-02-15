import User from '@core/schemas/user.schema';
import ApiError from '@shared/utils/ApiError';
import { hashSync } from 'bcryptjs';
import { CityManagerDto } from '../dtos/city-manager-dtos';
import validations from '../validations';

export class CreateCityManagerService {
  async execute(cityManagerDto: CityManagerDto): Promise<void> {
    try {
      const values = validations.create(cityManagerDto);

      const userExists = await User.findOne({ email: values.email, roles: ['CityManager'] });

      if (userExists) throw new ApiError('Usuário já existente no sistema');

      await User.create({
        ...values,
        password: hashSync(values.password, 8),
        roles: ['CityManager']
      });
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    };
  };
};
