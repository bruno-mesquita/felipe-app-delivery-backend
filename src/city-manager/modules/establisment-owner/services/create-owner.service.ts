import { Op } from 'sequelize';

import { EstablishmentOwner } from '@core/establishment-owner';
import ApiError from '@shared/utils/ApiError';
import { CreateOwnerDto } from '../dtos/create-owner-dtos';
import { schema } from '../validations/create-owner.validation';

export class CreateOwnerService {
  async execute(createOwnerDto: CreateOwnerDto): Promise<void> {
    try {
      const validation = schema.isValidSync(createOwnerDto);

      if (!validation) throw new ApiError('Dados inválidos');

      const ownerExist = await EstablishmentOwner.findOne({
        where: {
          [Op.or]: [
            { email: createOwnerDto.email },
            { cpf: createOwnerDto.cpf },
          ],
        },
      });

      if (ownerExist) throw new ApiError('Usuário já existente no sistema');

      const owner = new EstablishmentOwner({
        ...createOwnerDto,
        first_name: createOwnerDto.firstName,
        last_name: createOwnerDto.lastName,
      });

      owner.hashPassword();

      await owner.save();
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
