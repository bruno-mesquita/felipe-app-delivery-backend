/**
 * @fileoverview Criação do serviço para atualização do perfil do usuário
 *
 * @author Bruno Mesquita
 */
import { getCustomRepository } from 'typeorm';

import { ServiceResponse } from '@shared/utils/service-response';
import ClientRepository from '../../typeorm/repository';
import { UpdateClientDto } from '../../dtos/update-client-dto';
import updateClientValidation from '../../validation/update-client.validation';

class UpdateProfileService {
  async execute(updateClientDto: UpdateClientDto): Promise<ServiceResponse<boolean>> {
    try {
      const clientRepository = getCustomRepository(ClientRepository);

      // validando dto
      const valid = updateClientValidation.isValidSync(updateClientDto);

      if (!valid) throw new Error('Dados inválidos');

      // verificando se o usuário existe
      const user = await clientRepository.findById(updateClientDto.id);

      if (!user) throw new Error('Usuário não encontrado');

      if (user.isActive()) throw new Error('Esse usuário não se encontra ativo');

      const { cellphone, email, name } = updateClientDto;

      user.updateProfile(name, email, cellphone);

      await clientRepository.save(user);

      return { result: true, err: null };
    } catch (err) {
      return { err: err.message, result: false };
    }
  }
}

export default UpdateProfileService;
