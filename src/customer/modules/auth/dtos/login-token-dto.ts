/**
 * @fileoverview Criação de tipagem exclusiva da Sessão de login do Cliente
 *
 * @author Jonatas Rosa Moura
 */

import Client from '@core/client';

export interface IClientAuth {
  client: Client;
  token: string;
}
