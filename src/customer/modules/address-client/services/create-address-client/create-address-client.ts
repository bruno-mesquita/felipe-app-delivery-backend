import AddressClient from '@core/address-client';
import City from '@core/city';
import Client from '@core/client';
import ApiError from '@shared/utils/ApiError';
import type { IClientAddressDto } from '../../dtos';

export class CreateAddressClientService {
  async execute(createAddressDto: IClientAddressDto): Promise<void> {
    try {
      // Verificando se a cidade existe no banco
      const city = await City.findByPk(createAddressDto.city);

      if (!city) throw new ApiError('[ERRO: Endereço] Cidade selecionada não existe no sistema');

      const client = await Client.findOne({
        where: { id: createAddressDto.userId },
        attributes: ['id', 'name'],
      });

      if(!client) throw new ApiError('Cliente não encontrado');

      const { cep, neighborhood, nickname, number, street,  userId } = createAddressDto;

      await AddressClient.create({
        nickname,
        street,
        number,
        neighborhood,
        cep,
        city_id: city.getId(),
        active: false,
        client_id: userId
      });

    } catch (err) {
      ApiError.verifyType(err);

      throw new ApiError('Erro desconhecido', 'unknown', 500);
    }
  }
}
