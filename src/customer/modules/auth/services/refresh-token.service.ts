import { ServiceResponse } from "@shared/utils/service-response";
import TokenManager from "@shared/utils/token-manager";
import Client from '@core/client';
import ApiError from "@shared/utils/ApiError";

interface Response {
  accessToken: string;
  refreshToken: string;
}

export class RefreshTokenService {
  async execute(token: string): Promise<ServiceResponse<Response>> {
    try {
      const tokenManager = new TokenManager();

      const payload = tokenManager.check(token);

      if(!payload) throw new Error('Payload não existente');

      const client = await Client.findOne({
        where: { id: payload.id },
        attributes: ['id'],
      });

      if (!client) throw new Error('Cliente não encontrado');

      const refreshToken = tokenManager.createRefreshToken(client.getId());
      const accessToken = tokenManager.create(client.getId());

      return { result: { accessToken, refreshToken  }, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw new ApiError('Erro interno', 'auth', 401);
    }
  }
}
