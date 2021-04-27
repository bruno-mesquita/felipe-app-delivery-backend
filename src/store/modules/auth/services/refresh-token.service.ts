import { ServiceResponse } from "@shared/utils/service-response";
import TokenManager from "@shared/utils/token-manager";
import Establishment from "@core/establishment";

class RefrishTokenService {
  async execute(token: string): Promise<ServiceResponse<any>> {
    try {
      const tokenManager = new TokenManager();

      const clientId = tokenManager.check(token);

      if(!clientId) throw new Error();

      const client = await Establishment.findOne({
        where: { id: clientId.id },
        attributes: ['id'],
      });

      if (!client) throw new Error('Cliente não encontrado');

      const refreshToken = tokenManager.createRefreshToken(client.id);
      const accessToken = tokenManager.create(client.id);

      return { result: { accessToken, refreshToken  }, err: null };
    } catch (err) {
      return { result: null, err: "Token inválido" };
    }
  }
}

export { RefrishTokenService };
