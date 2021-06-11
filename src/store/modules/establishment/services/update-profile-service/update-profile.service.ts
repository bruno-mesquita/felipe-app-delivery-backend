import Establishment from '@core/establishment';
import { ServiceResponse } from '@shared/utils/service-response';
import { UpdateEstablishmentDto } from '../../dtos/update-establishment-dto';
import updateClientValidation from '../../validation/update-establishment.validation';
import { EstablishmentOwner } from '@core/establishment-owner';
import AddressEstablishment from '@core/address-establishment';

export class UpdateProfileService {
  async execute(UpdateEstablishmentDto: UpdateEstablishmentDto): Promise<ServiceResponse<boolean>> {
    try {
      // validando dto
      const valid = updateClientValidation.isValidSync(UpdateEstablishmentDto);

      if (!valid) throw new Error('Dados inválidos');

      // verificando se o usuário existe
      const owner = await EstablishmentOwner.findOne({
        where: { id: UpdateEstablishmentDto.userId },
        include: [{
          model: Establishment,
          as: 'establishment',
          where: { id: UpdateEstablishmentDto.id, active: true },
          include: [{
            model: AddressEstablishment,
            as: 'address',
          }]
        }],
      });

      if (!owner) throw new Error('Dono não encontrado');

      const { establishment } = owner;
      const { address, ...rest } = UpdateEstablishmentDto;

      establishment.updateProfile(rest as any);
      establishment.setFreightValue(rest.freightValue);
      establishment.address.setCityId(address.city)
      establishment.address.setNeighborhood(address.neighborhood)
      establishment.address.setNumber(address.number)
      establishment.address.setStreet(address.street)
      establishment.address.setCep(address.cep)

      await establishment.save();
      await establishment.address.save();

      return { result: true, err: null };
    } catch (err) {
      return { err: err.message, result: false };
    }
  }
}
