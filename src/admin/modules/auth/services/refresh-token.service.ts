import { ServiceResponse } from "@shared/utils/service-response";
import TokenManager from "@shared/utils/token-manager";
import Admin from '@core/admin';
import ApiError from "@shared/utils/ApiError";

export class RefreshTokenService {
  async execute(token: string): Promise<ServiceResponse<string | null>> {
    try {
      const tokenManager = new TokenManager();

      const adminId = tokenManager.check(token);

      const admin = await Admin.findOne({
        where: { id: adminId.id },
        attributes: ['id'],
      });

      if (!admin) throw new ApiError('Usuário não encontrado');

      const accessToken = tokenManager.createRefreshToken(admin.getId());

      return { result: accessToken, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
