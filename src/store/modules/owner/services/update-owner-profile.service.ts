import { EstablishmentOwner } from '@core/establishment-owner';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';

interface UpdateOwnerDto {
  first_name: string;
  last_name: string;
  email: string;
  cpf: string;
}

export class UpdateOwnerProfileService {
  async execute(
    model: UpdateOwnerDto,
    id: number
  ): Promise<ServiceResponse<boolean>> {
    try {
      const owner = await EstablishmentOwner.findOne({
        where: { id },
        attributes: [
          'id',
          'first_name',
          'last_name',
          'email',
          'cellphone',
          'cpf',
        ],
      });

      if (!owner) throw new ApiError('Dono não encontrado');

      await owner.update(model);

      return { err: null, result: true };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
