import { Op } from 'sequelize';

import Establishment from '@core/establishment';
import { ServiceResponse } from '@shared/utils/service-response';
import { UpdateEstablishmentDto } from '../../dtos/update-establishment-dto';
import updateClientValidation from '../../validation/update-establishment.validation';

export class UpdateProfileService {
  async execute(UpdateEstablishmentDto: UpdateEstablishmentDto): Promise<ServiceResponse<boolean>> {
    try {
      // validando dto
      const valid = updateClientValidation.isValidSync(UpdateEstablishmentDto);

      if (!valid) throw new Error('Dados inválidos');

      // verificando se o usuário existe


      const user = await Establishment.findOne({
        where: { id: UpdateEstablishmentDto.id, active: true }
      });

      if (!user) throw new Error('Usuário não encontrado');

      // Verificando se E-mail e Celular já existe no banco
      const userExists = await Establishment.findOne({
        where: {
          [Op.or]: [
            { [Op.not]: { email: user.email } },
            { email: UpdateEstablishmentDto.email },
            { [Op.not]: { cellphone: user.cellphone } },
            { cellphone: UpdateEstablishmentDto.cellphone },
          ]
        }
      });

      if (!userExists) throw new Error('Já existe uma conta com esse email/telefone ');

      // Desestruturando
      const { cellphone, email, name } = UpdateEstablishmentDto;

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
