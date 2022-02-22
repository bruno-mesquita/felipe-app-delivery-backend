import type { Request, Response, NextFunction } from 'express';

import Admin from '@core/admin';

export async function accessAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    // Verificar o id do admin
    const adminId = request.client.id;
    // const apiType = request.headers.apiType as string || 'old';

    const admin = await Admin.findByPk(adminId);

    if (!admin) return response.status(401).json('[Acesso]: ID está ausente');

    request.client.entity = admin as any;

    return next();
  } catch (err) {
    return response.status(401).json({
      err: '[Falha no acesso]: ID inválido',
      type: 'Autenticação',
      message: 'ID Inválido',
    });
  }
}
