import Establishment from '@core/establishment';
import { ServiceResponse } from '@shared/utils/service-response';
import { UpdatePasswordEstablishmentDto } from '../../dtos/update-password-establishment-dto';
import updatePasswordEstabishmentValidation from '../../validation/update-password-establishment.validation';

export class UpdatePasswordEstabishmentService {
  async execute(updatePasswordEstablishmentDto: UpdatePasswordEstablishmentDto): Promise<ServiceResponse<boolean>> {
    try {
      console.log(updatePasswordEstablishmentDto);
      // validando dados
      if (!updatePasswordEstabishmentValidation.isValidSync(updatePasswordEstablishmentDto)) throw new Error('Dados inválidos');

      // Verificando se o usuário existe
      const user = await Establishment.findOne({where: { id: updatePasswordEstablishmentDto.id, active: true } });

      if (!user) throw new Error('Usuário não encontrado');

      // Verificando se a senha fornecida é igual salva
      if (!user.comparePassword(updatePasswordEstablishmentDto.currentPassword)) throw new Error('Senha inválida');

      user.setPassword(updatePasswordEstablishmentDto.newPassword);

      await user.save();

      return { result: true, err: null };
    } catch (err) {
      return { result: false, err: err.message };
    }
  }
}
