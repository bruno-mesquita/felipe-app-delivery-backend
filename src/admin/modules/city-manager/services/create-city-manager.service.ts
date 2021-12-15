import CityManager from '@core/city-manager';
import { ServiceResponse } from '@utils/service-response';
import { CityManagerDto } from '../dtos/city-manager-dtos';
import { schema } from '../validations/create-owner.validation';

export class CreateCityManagerService {
  async execute(cityManagerDto: CityManagerDto): Promise<ServiceResponse<boolean>> {
    try {
      const validation = schema.isValidSync(cityManagerDto);

      if (!validation) throw new Error('Dados inválidos');

      const cityManagerExists = await CityManager.findOne({
        where: { email: cityManagerDto.email },
        attributes: ['id'],
      });

      if (cityManagerExists) throw new Error('Usuário já existente no sistema');

      const cityManager = new CityManager(cityManagerDto)

      cityManager.hashPassword();

      await cityManager.save();

      return { result: true, err: null };
    } catch (err) {
      return { result: false, err: err.message };
    };
  };
};
