import Establishment from '@core/establishment';
import { ServiceResponse } from '@shared/utils/service-response';
import { EstablishmentOwner } from '@core/establishment-owner';
import AddressEstablishment from '@core/address-establishment';
import ApiError from '@shared/utils/ApiError';
import updateClientValidation from '../../validation/update-establishment.validation';
import { UpdateEstablishmentDto } from '../../dtos/update-establishment-dto';

export class UpdateProfileService {
  async execute(
    model: UpdateEstablishmentDto
  ): Promise<ServiceResponse<boolean>> {
    try {
      // validando dto
      const valid = updateClientValidation.isValidSync(model);

      if (!valid) throw new ApiError('Dados inválidos');

      const { userId, id, address: addressModel, ...rest } = model;

      // verificando se o usuário existe
      const owner = await EstablishmentOwner.findOne({
        where: { id: userId },
        include: [
          {
            model: Establishment,
            as: 'establishment',
            where: { id, active: true },
            include: [
              {
                model: AddressEstablishment,
                as: 'address',
              },
            ],
          },
        ],
      });

      if (!owner) throw new ApiError('Dono não encontrado');

      const establishment = owner.get('establishment');
      const address = establishment.get('address');

      const { city, ...addressDto } = addressModel;

      await establishment.update(rest);
      await address.update({ ...addressDto, city_id: city });

      return { result: true, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
