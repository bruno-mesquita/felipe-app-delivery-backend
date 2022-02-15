/**
 * @fileoverview Verificando se é o id do cityManager que está criando nessa rota
 */

import CityManager from '@core/city-manager';
import { Request, Response, NextFunction } from 'express';

export async function accessCityManager(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
  try {
    // Verificar o id do cityManager
    const cityManagerId = request.client.id;

    const cityManager = await CityManager.findOne({ where: { id: cityManagerId, active: true } });

    if (!cityManager) {
      return response.status(401).json('[Acesso]: ID está ausente');
    }

    request.client.entity = cityManager as any;

    return next();
  } catch(err) {
    return response.status(401).json({ err: '[Falha no acesso]: ID inválido', type: 'Autenticação', message: 'ID Inválido' });
  }
}
