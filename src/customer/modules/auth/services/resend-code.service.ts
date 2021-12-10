/**
 * @fileoverview Criação do serviço para reenvio do codigo de ativação
 */

import Client from '@core/client';
import ApiError from '@shared/utils/ApiError';
import SmsService from '@shared/utils/sms';

import { IResendCodeDto } from '../dtos/resend-code.dto';

export class ResendCodeService {
  async execute({ cellphone, newCellphone }: IResendCodeDto): Promise<void> {
    try {
      const client = await Client.findOne({
        where: { cellphone },
        attributes: ['id', 'cellphone']
      });

      if (!client) throw new ApiError('Cliente não encontrado');

      if(newCellphone) {
        client.setCellphone(newCellphone);

        await client.save();
      }

      const smsService = new SmsService();

      await smsService.sendCode(client.getCellphone());

    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
