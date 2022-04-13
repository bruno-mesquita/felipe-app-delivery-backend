import Client from '@core/client';
import ApiError from '@shared/utils/ApiError';
import SmsService from '@shared/utils/sms';

import { IResetPasswordDto } from '../dtos/reset-password.dto';

export class ResetPasswordService {
  async execute({ newPassword, confirmPassword, code, cellphone }: IResetPasswordDto): Promise<void> {
    try {
      const client = await Client.findOne({
        where: { cellphone },
        attributes: ['id', 'cellphone'],
      });

      if (!client) throw new ApiError('usuário não encontrado');

      const smsService = new SmsService();

      await smsService.verifyCode(client.cellphone, code);

      if (newPassword !== confirmPassword) throw new ApiError('Senhas não são iguais');

      client.setPassword(newPassword);
      client.hashPassword();

      await client.save();
    } catch (err) {
      ApiError.verifyType(err);

      throw new ApiError('Erro ao recuperar senha', 'unknown');
    }
  }
}
