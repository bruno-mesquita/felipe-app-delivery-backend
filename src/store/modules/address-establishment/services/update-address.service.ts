import AddressEstablishment from "@core/address-establishment";
import { ServiceResponse } from "@shared/utils/service-response";
import { UpdateAddressDto } from "../dtos/update-address.dto";
import addressUpdateValidation from '../validation/update-address.validation';

export class UpdateAdressService {
  async execute(updateAddressDto: UpdateAddressDto): Promise<ServiceResponse<boolean>> {
    try {
      const valid = addressUpdateValidation.isValidSync(updateAddressDto);

      if (!valid) throw new Error('Dados inválidos');

      const addressEstablishment = await AddressEstablishment.findByPk(updateAddressDto.id);

      if (!addressEstablishment) throw new Error('Endereço do Estabelecimento não encontrado');

      const { street, number, neighborhood, cep, city } = updateAddressDto;

      addressEstablishment.setStreet(street);
      addressEstablishment.setNumber(number);
      addressEstablishment.setNeighborhood(neighborhood);
      addressEstablishment.setCep(cep);
      addressEstablishment.setCityId(city);

      await addressEstablishment.save();

      return { result: true, err: null }
    } catch(err) {
      return { result: false, err: err.message };
    }
  };
}
