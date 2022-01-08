import { EstablishmentOwner } from '@core/establishment-owner';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';
import { UpdatePasswordEstablishmentDto } from '../../dtos/update-password-owner-dto';
import updatePasswordEstabishmentValidation from '../../validation/update-password-owner.validation';

export class UpdatePasswordEstabishmentService {
  async execute(updatePasswordDto: UpdatePasswordEstablishmentDto): Promise<ServiceResponse<boolean>> {
    try {
      // validando dados
      if (!updatePasswordEstabishmentValidation.isValidSync(updatePasswordDto)) throw new ApiError('Dados inválidos');

      // Verificando se o usuário existe
      const user = await EstablishmentOwner.findOne({ where: { id: updatePasswordDto.id, active: true } });

      if (!user) throw new ApiError('Usuário não encontrado');

      // Verificando se a senha fornecida é igual salva
      if (!user.comparePassword(updatePasswordDto.currentPassword)) throw new ApiError('Senha inválida');

      user.setPassword(updatePasswordDto.newPassword);
      user.hashPassword();

      await user.save();

      return { result: true, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
