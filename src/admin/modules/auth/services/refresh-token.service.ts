import { ServiceResponse } from "@shared/utils/service-response";
import TokenManager from "@shared/utils/token-manager";
import Admin from '@core/admin';

export class RefreshTokenService {
  async execute(token: string): Promise<ServiceResponse<string | null>> {
    try {
      const tokenManager = new TokenManager();

      const adminId = tokenManager.check(token);

      const admin = await Admin.findOne({
        where: { id: adminId.id },
        attributes: ['id'],
      });

      if (!admin) throw new Error('Usuário não encontrado');

      const accessToken = tokenManager.createRefreshToken(admin.getId());

      return { result: accessToken, err: null };
    } catch (err) {
      return { result: null, err: "Token inválido" };
    }
  }
}
