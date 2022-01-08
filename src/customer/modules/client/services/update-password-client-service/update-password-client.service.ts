/**
 * @fileoverview Criação do serviço para atualização da senha do usuário
 *
 * @author Bruno Mesquita
 */
import Client from '@core/client';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';
import { IUpdatePasswordClientDto } from '../../dtos';

class UpdatePasswordClientService {
  async execute(updatePasswordClientDto: IUpdatePasswordClientDto): Promise<ServiceResponse<boolean>> {
    try {
      // Verificando se o usuário existe
      const user = await Client.findOne({where: { id: updatePasswordClientDto.id, active: true } });

      if (!user) throw new ApiError('Usuário não encontrado');

      // Verificando se a senha fornecida é igual salva
      if (!user.comparePassword(updatePasswordClientDto.currentPassword)) throw new ApiError('Senha inválida');

      user.setPassword(updatePasswordClientDto.newPassword);
      user.hashPassword();

      await user.save();

      return { result: true, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}

export default UpdatePasswordClientService;
