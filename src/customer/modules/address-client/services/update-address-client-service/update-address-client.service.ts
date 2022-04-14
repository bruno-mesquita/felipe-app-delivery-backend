import AddressClient from '@core/address-client';
import City from '@core/city';
import ApiError from '@shared/utils/ApiError';
import type { IUpdateClientAddressDto } from '../../dtos';

export class UpdateAddressClientService {
  async execute(updateClientAddressDto: IUpdateClientAddressDto): Promise<void> {
    try {
      const addressClient = await AddressClient.findByPk(updateClientAddressDto.id, {
        attributes: ['id'],
      });

      if (!addressClient) throw new ApiError('Endereço não encontrado');

      if (updateClientAddressDto.city) {
        const cityExists = await City.findByPk(updateClientAddressDto.city, {
          attributes: ['id'],
        });

        if (!cityExists) throw new ApiError('Cidade não encontrada');
      }

      await addressClient.update({
        ...updateClientAddressDto,
        city_id: updateClientAddressDto.city,
      });

      await addressClient.save();
    } catch (err) {
      ApiError.verifyType(err);

      throw new ApiError('Erro desconhecido', 'unknown', 500);
    }
  }
}
