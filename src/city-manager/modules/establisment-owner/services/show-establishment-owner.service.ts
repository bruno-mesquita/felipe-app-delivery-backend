import { ServiceResponse } from '@shared/utils/service-response';
import { EstablishmentOwner } from '@core/establishment-owner';
import Establishment from '@core/establishment';
import AddressEstablishment from '@core/address-establishment';
import City from '@core/city';
import State from '@core/state';
import ApiError from '@shared/utils/ApiError';

export class ShowOwnerEstablishmentService {
  async execute(establishmentId: number): Promise<EstablishmentOwner> {
    try {
      const ownerEstablishment = await EstablishmentOwner.findOne({
        attributes: ['id', 'first_name', 'last_name'],
        include: [
          {
            model: Establishment,
            as: 'establishment',
            where: { id: establishmentId },
            attributes: ['id', 'name', 'cellphone', 'active', 'evaluation'],
            include: [
              {
                model: AddressEstablishment,
                as: 'address',
                attributes: ['id', 'neighborhood', 'cep'],
                include: [
                  {
                    model: City,
                    as: 'city',
                    attributes: ['id', 'name'],
                    include: [
                      {
                        model: State,
                        as: 'state',
                        attributes: ['id', 'name'],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });

      if (!ownerEstablishment)
        throw new ApiError('Estabelecimento não encontrado');

      return ownerEstablishment;
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
