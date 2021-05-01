/**
 * @fileoverview Criação do serviço para atualização do perfil do usuário
 *
 * @author Bruno Mesquita
 */
import { Op } from 'sequelize';

import Client from '@core/client';
import { ServiceResponse } from '@shared/utils/service-response';
import { UpdateClientDto } from '../../dtos/update-client-dto';
import updateClientValidation from '../../validation/update-client.validation';

class UpdateProfileService {
  async execute(updateClientDto: UpdateClientDto): Promise<ServiceResponse<boolean>> {
    try {
      // validando dto
      const valid = updateClientValidation.isValidSync(updateClientDto);

      if (!valid) throw new Error('Dados inválidos');

      // verificando se o usuário existe

      const user = await Client.findOne({
        where: { id: updateClientDto.id, active: true }
      });

      if (!user) throw new Error('Usuário não encontrado');

      // Verificando se E-mail e Celular já existe no banco
      const userExists = await Client.findOne({
        where: {
          [Op.or]: [
            { [Op.not]: { email: user.email } },
            { email: updateClientDto.email },
            { [Op.not]: { cellphone: user.cellphone } },
            { cellphone: updateClientDto.cellphone },
          ]
        }
      });

      if (!userExists) throw new Error('Já existe uma conta com esse email/telefone ');

      // Desestruturando
      const { cellphone, email, name } = updateClientDto;

      user.setName(name);
      user.setEmail(email);
      user.setCellphone(cellphone);

      await user.save();

      return { result: true, err: null };
    } catch (err) {
      return { err: err.message, result: false };
    }
  }
}

export default UpdateProfileService;
