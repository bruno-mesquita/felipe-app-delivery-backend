/**
 * @fileoverview Criação do serviço para atualização da senha do usuário
 *
 * @author Bruno Mesquita
 */

import { getCustomRepository } from 'typeorm';

import { ServiceResponse } from '@shared/utils/service-response';
import { UpdatePasswordClientDto } from '../../dtos/update-password-client-dto';
import ClientRepository from '../../typeorm/repository';
import updatePasswordClientValidation from '../../validation/update-password-client.validation';

class UpdatePasswordClientService {
  async execute(updatePasswordClientDto: UpdatePasswordClientDto): Promise<ServiceResponse<boolean>> {
    try {
      const clientRepository = getCustomRepository(ClientRepository);

      // validando dados
      if (!updatePasswordClientValidation.isValidSync(updatePasswordClientDto)) throw new Error('Dados inválidos');

      // Verificando se o usuário existe
      const user = await clientRepository.findById(updatePasswordClientDto.id);

      if (!user) throw new Error('Usuário não encontrado');

      // Verificando se a senha fornecida é igual salva
      if (!user.comparePassword(updatePasswordClientDto.password)) throw new Error('Senha inválida');

      user.setPassword(updatePasswordClientDto.newPassword);

      await clientRepository.save(user);

      return { result: true, err: null };
    } catch (err) {
      return { result: false, err: err.message };
    }
  }
}

export default UpdatePasswordClientService;
