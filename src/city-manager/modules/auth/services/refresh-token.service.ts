import TokenManager from "@shared/utils/token-manager";
import CityManager from '@core/city-manager';
import ApiError from "@shared/utils/ApiError";

import { IRefreshTokenDto } from '../dtos';

export class RefreshTokenService {
  private tokenManager: TokenManager;

  constructor() {
    this.tokenManager = new TokenManager();
  }

  async execute({ token }: IRefreshTokenDto): Promise<any> {
    try {
      const payload = this.tokenManager.check(token);

      const cityManager = await CityManager.findOne({
        where: { id: payload.id },
        attributes: ['id'],
      });

      if (!cityManager) throw new ApiError('Cliente não encontrado', 'auth', 401);

      return this.tokenManager.create(cityManager.getId());
    } catch (err) {
      ApiError.verifyType(err)

      throw ApiError.generateErrorUnknown();
    }
  }
}
