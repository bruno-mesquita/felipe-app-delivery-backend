import ApiError from '@shared/utils/ApiError';
import Notification from '@shared/utils/Notification';

export class RegisterProviderNotification {
  private readonly notificationService: Notification;

  constructor() {
    this.notificationService = new Notification();
  }

  async execute(pushToken: string, clientId: number): Promise<void> {
    try {
      await this.notificationService.addListener({
        targetId: clientId,
        token: pushToken,
        type: 'Partner'
      });
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
};
