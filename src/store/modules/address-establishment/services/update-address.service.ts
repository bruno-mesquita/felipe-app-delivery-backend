import AddressEstablishment from "@core/address-establishment";
import Establishment from "@core/establishment";
import { ServiceResponse } from "@shared/utils/service-response";
import { UpdateAddressDto } from "../dtos/update-address.dto";
import addressUpdateValidation from '../validation/update-address.validation';

export class UpdateAdressService {
  async execute(updateAddressDto: UpdateAddressDto): Promise<ServiceResponse<boolean>> {
    try {
      const valid = addressUpdateValidation.isValidSync(updateAddressDto);

      if (!valid) throw new Error('Dados inválidos');

      const establishmet = await Establishment.findOne({
        where: { id: updateAddressDto.id, active: true },
      });

      if (!establishmet) throw new Error('Estabelecimento não encontrado');

      const addressEstablishment = await AddressEstablishment.findByPk(establishmet.address_id);

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
