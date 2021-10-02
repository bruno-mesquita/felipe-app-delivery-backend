import { ServiceResponse } from "@shared/utils/service-response";
import TokenManager from "@shared/utils/token-manager";
import CityManager from '@core/city-manager';

export class RefreshTokenService {
  async execute(token: string): Promise<ServiceResponse<string | null>> {
    try {
      const tokenManager = new TokenManager();

      const clientId = tokenManager.check(token);

      const cityManager = await CityManager.findOne({
        where: { id: clientId.id },
        attributes: ['id'],
      });

      if (!cityManager) throw new Error('Cliente não encontrado');

      const accessToken = tokenManager.createRefreshToken(cityManager.id);

      return { result: accessToken, err: null };
    } catch (err) {
      return { result: null, err: "Token inválido" };
    }
  }
}
