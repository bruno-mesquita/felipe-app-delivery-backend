import { ServiceResponse } from '@shared/utils/service-response';
import TokenManager from '@shared/utils/token-manager';
import Admin from '@core/admin';
import ApiError from '@shared/utils/ApiError';

export class RefreshTokenService {
  private tokenManager: TokenManager;

  constructor() {
    this.tokenManager = new TokenManager();
  }

  async execute(token: string): Promise<any> {
    try {
      const payload = this.tokenManager.check(token);

      const admin = await Admin.findOne({
        where: { id: payload.id },
        attributes: ['id'],
      });

      if (!admin) throw new ApiError('Usuário não encontrado');

      return this.tokenManager.create(admin.getId());
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
