/**
 * @fileoverview verificar se o usuário está autenticado -> middleware de autenticação -> proteger as rotas que vão ser verificadas
 */

import { Request, Response, NextFunction } from 'express';

import TokenManager from '@shared/utils/token-manager';

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void | Response {
  try {
    const authConfig = new TokenManager();

    // verificar se no cabeçalho existe um token

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return response
        .status(401)
        .json({ Autenticação: 'JWT Token está ausente' });
    }

    // array token vai ter 2 posições -> Bearer açsd6464JAFPO(&&%/;). -> chave secreta (token)

    const token = authHeader.split(' ')[1];

    // verificar se esse token foi criado pela minha aplicação, se ele é válido (se eu posso liberar o acesso)

    const decodedToken = authConfig.check(token);

    request.client.id = decodedToken.id;

    return next();
  } catch (err) {
    return response.status(401).json({
      error: '[Autenticação]: Token Inválido.',
      type: 'Autenticação',
      message: 'Token Inválido.',
    });
  }
}
