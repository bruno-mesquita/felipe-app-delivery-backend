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
  async execute({ code, userId }: IActiveClientDto): Promise<void> {
    try {
      // verificar se o usuário existe
      const user = await Client.findOne({ where: { id: userId, active: false } });

      if (!user) throw new Error('Cliente não encontrado');

      const smsService = new SmsService();

      await smsService.verifyCode(user.getCellphone(), code);

      user.activate();

      await user.save();
    } catch (err) {
      ApiError.verifyType(err);

      throw new ApiError('Erro ao ativar usuário, peça um novo código', 'unknown');
    }
  }
}

export default ActiveClientService;
