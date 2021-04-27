/**
 * @fileoverview Classe para manipulação do token
 *
 * @author Bruno Mesquita
 */

import { verify, sign } from 'jsonwebtoken';

class TokenManager {
  public check(token: string): { id: number } | null {
    try {
      return verify(token, process.env.JWT_PASS) as { id: number };
    } catch {
      return null;
    }
  }

  public create(id: number): string {
    return sign({ id }, process.env.JWT_PASS, { expiresIn: process.env.JWT_EXPIRES });
  }

  public createRefreshToken(id: number): string {
    return sign({ id }, process.env.JWT_PASS, { expiresIn: process.env.JWT_REFRESH_EXPIRES });
  }
}

export default TokenManager;
