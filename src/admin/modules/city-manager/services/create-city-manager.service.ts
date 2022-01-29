import User from '@core/schemas/user.schema';
import ApiError from '@shared/utils/ApiError';
import { hashSync } from 'bcryptjs';
import { CityManagerDto } from '../dtos/city-manager-dtos';
import { schema } from '../validations/create-owner.validation';

export class CreateCityManagerService {
  async execute(cityManagerDto: CityManagerDto): Promise<void> {
    try {
      const validation = schema.isValidSync(cityManagerDto);

      if (!validation) throw new ApiError('Dados inválidos');

      const userExists = await User.findOne({ email: cityManagerDto.email, roles: ['CityManager'] });

      if (userExists) throw new ApiError('Usuário já existente no sistema');

      await User.create({
        ...cityManagerDto,
        password: hashSync(cityManagerDto.password, 8),
        roles: ['CityManager']
      });
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    };
  };
};
