/**

 * @fileoverview Criação da interface para padronizar respostas dos serviços

 *

 * @author Bruno Mesquita

 */

export interface ServiceResponse<T> {
  result: T;

  err: string | null;
}
