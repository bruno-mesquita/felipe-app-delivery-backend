import ApiError from '@shared/utils/ApiError';
import Notification from '@shared/utils/Notification';

export class RegisterProviderNotification {
  async execute(pushToken: string, clientId: number): Promise<void> {
    try {
      const notificationService = new Notification();

      await notificationService.addListener({
        targetId: clientId,
        token: pushToken,
        type: 'Partner',
      });
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
