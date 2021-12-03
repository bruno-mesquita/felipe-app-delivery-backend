import Notification from '@shared/utils/Notification';
import { ServiceResponse } from '@shared/utils/service-response';

export class RegisterProviderNotification {
  async execute(pushToken: string, clientId: number): Promise<ServiceResponse<boolean>> {
    try {
      const notification = new Notification();

      await notification.addListener({
        targetId: clientId,
        token: pushToken,
        type: 'Client'
      });

      return { result: true, err: null };
    } catch (err) {
      return { err: 'Erro ao registrar push notification', result: false }
    }
  }
};
