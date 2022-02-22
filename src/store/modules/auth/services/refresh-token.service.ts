import TokenManager from '@shared/utils/token-manager';
import ApiError from '@shared/utils/ApiError';
import { EstablishmentOwner } from '@core/establishment-owner';

export class RefreshTokenService {
  private tokenManager: TokenManager;

  constructor() {
    this.tokenManager = new TokenManager();
  }

  async execute(
    token: string
  ): Promise<{ token: string; refreshToken: string }> {
    try {
      const payload = this.tokenManager.check(token);

      const client = await EstablishmentOwner.findOne({
        where: { id: payload.id },
        attributes: ['id'],
      });

      if (!client) throw new ApiError('Cliente não encontrado');

      return this.tokenManager.create(client.getId());
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
