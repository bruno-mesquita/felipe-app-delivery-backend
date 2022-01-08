import TokenManager from "@shared/utils/token-manager";
import ApiError from "@shared/utils/ApiError";
import { EstablishmentOwner } from "@core/establishment-owner";

export class RefreshTokenService {
  async execute(token: string): Promise<{ token: string; refreshToken: string }> {
    try {
      const tokenManager = new TokenManager();

      const payload = tokenManager.check(token);

      if(!payload) throw new ApiError('Token invalido');

      const client = await EstablishmentOwner.findOne({
        where: { id: payload.id },
        attributes: ['id'],
      });

      if (!client) throw new ApiError('Cliente não encontrado');

      const refreshToken = tokenManager.createRefreshToken(client.getId());
      const accessToken = tokenManager.create(client.getId());

      return { token: accessToken, refreshToken };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
