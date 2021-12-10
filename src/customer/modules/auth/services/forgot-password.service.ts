import Client from '@core/client';
import ApiError from '@shared/utils/ApiError';
import SmsService from '@shared/utils/sms';

import { IForgotPasswordDto } from '../dtos/forgot-password.dto';

export class ForgotPasswordService {
  async execute({ cellphone }: IForgotPasswordDto): Promise<void> {
    try {

      const client = await Client.findOne({
        where: { cellphone },
        attributes: ['id', 'cellphone'],
      });

      if (!client) throw new ApiError('usuário não encontrado');

      const smsService = new SmsService();

      if(process.env.NODE_ENV !== 'test') await smsService.sendCode(client.getCellphone());
    } catch (err) {
      ApiError.verifyType(err)

      throw ApiError.generateErrorUnknown();
    }
  };
}
