/**
 * @fileoverview Criação do serviço para atualização do perfil do usuário
 *
 * @author Bruno Mesquita
 */
import { Op } from 'sequelize';

import Client from '@core/client';
import { ServiceResponse } from '@shared/utils/service-response';
import { IUpdateClientDto } from '../../dtos';
import ApiError from '@shared/utils/ApiError';

class UpdateProfileService {
  async execute(updateClientDto: IUpdateClientDto): Promise<ServiceResponse<boolean>> {
    try {
      // verificando se o usuário existe
      const user = await Client.findOne({
        where: { id: updateClientDto.id, active: true }
      });

      if (!user) throw new ApiError('Usuário não encontrado');

      // Verificando se E-mail e Celular já existe no banco
      const userExists = await Client.findOne({
        where: {
          [Op.or]: [
            { [Op.not]: { email: user.getEmail() } },
            { email: updateClientDto.email },
            { [Op.not]: { cellphone: user.getCellphone() } },
            { cellphone: updateClientDto.cellphone },
          ]
        }
      });

      if (!userExists) throw new ApiError('Já existe uma conta com esse email/telefone ');

      // Desestruturando
      const { cellphone, email, name } = updateClientDto;

      user.setName(name);
      user.setEmail(email);
      user.setCellphone(cellphone);

      await user.save();

      return { result: true, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}

export default UpdateProfileService;
