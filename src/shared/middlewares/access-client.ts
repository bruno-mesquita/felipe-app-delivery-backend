/**
 * @fileoverview Verificando se é o id do admin que está criando nessa rota
 */

import Client from '@core/client';
import { Request, Response, NextFunction } from 'express';

export async function accessClient(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    // Verificar o id do admin
    const clientId = req.client.id;

    const client = await Client.findByPk(clientId);

    if (!client) {
      return res.status(401).json('[Acesso]: ID está ausente');
    }

    req.client.entity = client as any;

    return next();
  } catch (err) {
    return res.status(401).json({
      err: '[Falha no acesso]: ID inválido',
      type: 'Autenticação',
      message: 'ID Inválido',
    });
  }
}
