import { ServiceResponse } from "@shared/utils/service-response";
import TokenManager from "@shared/utils/token-manager";
import Establishment from "@core/establishment";
import ApiError from "@shared/utils/ApiError";

export class RefrishTokenService {
  async execute(token: string): Promise<ServiceResponse<any>> {
    try {
      const tokenManager = new TokenManager();

      const clientId = tokenManager.check(token);

      if(!clientId) throw new ApiError('Token invalido');

      const client = await Establishment.findOne({
        where: { id: clientId.id },
        attributes: ['id'],
      });

      if (!client) throw new ApiError('Cliente não encontrado');

      const refreshToken = tokenManager.createRefreshToken(client.getId());
      const accessToken = tokenManager.create(client.getId());

      return { result: { accessToken, refreshToken  }, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
