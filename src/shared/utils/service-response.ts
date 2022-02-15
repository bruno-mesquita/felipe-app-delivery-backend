/**
 * @fileoverview Criação da interface para padronizar respostas dos serviços
 */

export interface ServiceResponse<T> {
  result: T;

  err: string | null;
}
