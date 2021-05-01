/**
 * @fileoverview Verificando se é o id do admin que está criando nessa rota
 */

 import Client from '@core/client';
 import { Request, Response, NextFunction } from 'express';

 export async function accessClient(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
   try {
    // Verificar o id do admin
    const clientId = request.client.id;

    const client = await Client.findByPk(clientId);

    if (!client) {
      return response.status(401).json('[Acesso]: ID está ausente');
    }

    return next();
  } catch(err) {
    return response.status(401).json({ err: '[Falha no acesso]: ID inválido', type: 'Autenticação', message: 'ID Inválido' });
  }
}
