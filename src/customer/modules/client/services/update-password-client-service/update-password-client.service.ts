/**
 * @fileoverview Criação do serviço para atualização da senha do usuário
 *
 * @author Bruno Mesquita
 */
import Client from '@core/client';
import { ServiceResponse } from '@shared/utils/service-response';
import { UpdatePasswordClientDto } from '../../dtos/update-password-client-dto';
import updatePasswordClientValidation from '../../validation/update-password-client.validation';

class UpdatePasswordClientService {
  async execute(updatePasswordClientDto: UpdatePasswordClientDto): Promise<ServiceResponse<boolean>> {
    try {
      // validando dados
      if (!updatePasswordClientValidation.isValidSync(updatePasswordClientDto)) throw new Error('Dados inválidos');

      // Verificando se o usuário existe
      const user = await Client.findByPk(updatePasswordClientDto.id);

      if (!user) throw new Error('Usuário não encontrado');

      // Verificando se a senha fornecida é igual salva
      if (!user.comparePassword(updatePasswordClientDto.currentPassword)) throw new Error('Senha inválida');

      user.setPassword(updatePasswordClientDto.newPassword);

      await user.save();

      return { result: true, err: null };
    } catch (err) {
      return { result: false, err: err.message };
    }
  }
}

export default UpdatePasswordClientService;
