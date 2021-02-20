/**
 * @fileoverview Criação de tipagem exclusiva do Login de Estabelecimento
 *
 * @author Jonatas Rosa Moura
 */

import Establishment from '@core/establishment';

export interface IEstablishmentAuth {
  establishment: Establishment;
  token: string;
}
