import CityManager from '@core/city-manager';
import ApiError from '@shared/utils/ApiError';
import { hashSync } from 'bcryptjs';
import { CityManagerDto } from '../dtos/city-manager-dtos';
import validations from '../validations';

export class CreateCityManagerService {
  async execute(cityManagerDto: CityManagerDto): Promise<void> {
    try {
      const { email, city, ...values } = validations.create(cityManagerDto);

      const userExists = await CityManager.findOne({ where: { email } });

      if (userExists) throw new ApiError('Usuário já existente no sistema');

      await CityManager.create({
        ...values,
        email,
        password: hashSync(values.password, 8),
        city_of_action_id: city,
      });
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    };
  };
};
