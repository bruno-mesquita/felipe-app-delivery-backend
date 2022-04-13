/**
 * @fileoverview Criação do serviço para ativação do cliente
 *
 * @author Bruno Mesquita
 */
import Client from '@core/client';
import ApiError from '@shared/utils/ApiError';
import SmsService from '@shared/utils/sms';

import { IActiveClientDto } from '../../dtos';

class ActiveClientService {
  private readonly smsService: SmsService;

  constructor() {
    this.smsService = new SmsService();
  }

  async execute({ code, userId }: IActiveClientDto): Promise<void> {
    try {
      // verificar se o usuário existe
      const user = await Client.findOne({
        where: { id: userId, active: false },
      });

      if (!user) throw new ApiError('Cliente não encontrado');

      await this.smsService.verifyCode(user.cellphone, code);

      user.activate();

      await user.save();
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}

export default ActiveClientService;
