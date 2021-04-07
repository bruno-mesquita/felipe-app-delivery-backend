import City from '@core/city';
import Client from '@core/client';
import { ServiceResponse } from '@shared/utils/service-response';
import { ClientAddressDto } from '../../dtos/create-address-client';
import { schema } from '../../validations/create-address-client';

export class CreateAddressClientService {
  async execute(createAddressDto: ClientAddressDto): Promise<ServiceResponse<any>> {
    try {
      const valid = schema.isValidSync(createAddressDto);

      if (!valid) throw new Error('[Erro: Endereço] Por favor reveja seus dados');

      // Verificando se a cidade existe no banco

      const city = await City.findByPk(createAddressDto.city);

      if (!city) throw new Error('[ERRO: Endereço] Cidade selecionada não existe no sistema');

      const client = await Client.findOne({
        where: { id: createAddressDto.userId },
        attributes: ['id', 'name'],
      });

      if(!client) throw new Error('Cliente não encontrado');

      const { cep, neighborhood, nickname, number, street } = createAddressDto;

      const result = await client.createAdress({
        nickname,
        street,
        number,
        neighborhood,
        cep,
        city_id: city.id,
      });

      return { result: !!result, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
