import ApiError from '@shared/utils/ApiError';
import Notification from '@shared/utils/Notification';

export class RegisterProviderNotification {
  async execute(pushToken: string, clientId: number): Promise<void> {
    try {
      const notification = new Notification();

      await notification.addListener({
        targetId: clientId,
        token: pushToken,
        type: 'Client',
      });
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
