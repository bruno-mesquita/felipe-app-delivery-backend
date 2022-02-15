import TokenManager from "@shared/utils/token-manager";
import Client from '@core/client';
import ApiError from "@shared/utils/ApiError";

interface IRefreshTokenServiceResponse {
  token: string;
  refreshToken: string;
}

export class RefreshTokenService {
  private tokenManager: TokenManager;

  constructor () {
    this.tokenManager = new TokenManager();
  }

  async execute(token: string): Promise<IRefreshTokenServiceResponse> {
    try {
      const payload = this.tokenManager.check(token);

      const client = await Client.findOne({
        where: { id: payload.id },
        attributes: ['id'],
      });

      if (!client) throw new ApiError('Cliente não encontrado');

      return this.tokenManager.create(client.getId());
    } catch (err) {
      ApiError.verifyType(err);

      throw new ApiError('Erro interno', 'auth', 401);
    }
  }
}
