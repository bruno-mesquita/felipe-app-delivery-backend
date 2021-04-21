import { ServiceResponse } from "@shared/utils/service-response";
import TokenManager from "@shared/utils/token-manager";
import Client from '@core/client';

class RefrishTokenService {
  async execute(token: string): Promise<ServiceResponse<string | null>> {
    try {
      const tokenManager = new TokenManager();

      const clientId = tokenManager.check(token);

      const client = await Client.findOne({
        where: { id: clientId.id },
        attributes: ['id'],
      });

      if (!client) throw new Error('Cliente não encontrado');

      const accessToken = tokenManager.createRefreshToken(client.id);

      return { result: accessToken, err: null };
    } catch (err) {
      return { result: null, err: "Token inválido" };
    }
  }
}

export { RefrishTokenService };
