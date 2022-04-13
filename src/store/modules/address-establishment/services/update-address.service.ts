import AddressEstablishment from '@core/address-establishment';
import Establishment from '@core/establishment';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';
import { UpdateAddressDto } from '../dtos/update-address.dto';
import addressUpdateValidation from '../validation/update-address.validation';

export class UpdateAdressService {
  async execute(updateAddressDto: UpdateAddressDto): Promise<ServiceResponse<boolean>> {
    try {
      const valid = addressUpdateValidation.isValidSync(updateAddressDto);

      if (!valid) throw new ApiError('Dados inválidos');

      const establishmet = await Establishment.findOne({
        where: { id: updateAddressDto.id, active: true },
        attributes: ['id', 'address_id'],
      });

      if (!establishmet) throw new ApiError('Estabelecimento não encontrado');

      const addressEstablishment = await AddressEstablishment.findByPk(establishmet.address_id);

      if (!addressEstablishment) throw new ApiError('Endereço do Estabelecimento não encontrado');

      const { street, number, neighborhood, cep, city } = updateAddressDto;

      await addressEstablishment.update({
        street,
        number,
        neighborhood,
        cep,
        city_id: city,
      });

      return { result: true, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
