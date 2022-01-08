import { ServiceResponse } from '@shared/utils/service-response';
import { EstablishmentOwner } from '@core/establishment-owner';
import ApiError from '@shared/utils/ApiError';


export class ProfileOwnertService {
  async execute(selects: string[], ownerId: number): Promise<ServiceResponse<any>> {
    try {
      const owner = await EstablishmentOwner.findOne({
        where: { id: ownerId, active: true },
        attributes: ['id'].concat(selects.filter(f => f !== 'passoword')),
      });

      if(!owner) throw new ApiError('Estabelecimento não encontrado');

      return {
        result: owner,
        err: null,
      };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
