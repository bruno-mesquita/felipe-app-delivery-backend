/**
 * @fileoverview Criação do serviço para atualização do perfil do usuário
 *
 * @author Bruno Mesquita
 */
import { Op } from 'sequelize';

import Client from '@core/client';
import { ServiceResponse } from '@shared/utils/service-response';
import ApiError from '@shared/utils/ApiError';
import { IUpdateClientDto } from '../../dtos';

class UpdateProfileService {
  async execute({ id, cellphone, email, name }: IUpdateClientDto): Promise<ServiceResponse<boolean>> {
    try {
      // verificando se o usuário existe
      const user = await Client.findOne({
        where: { id, active: true },
      });

      if (!user) throw new ApiError('Usuário não encontrado');

      // Verificando se E-mail e Celular já existe no banco
      const userExists = await Client.findOne({
        where: {
          [Op.or]: [
            { [Op.not]: { email: user.email } },
            { email },
            { [Op.not]: { cellphone: user.cellphone } },
            { cellphone },
          ],
        },
      });

      if (!userExists) throw new ApiError('Já existe uma conta com esse email/telefone ');

      await user.update({
        name,
        email,
        cellphone,
      });

      return { result: true, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}

export default UpdateProfileService;
