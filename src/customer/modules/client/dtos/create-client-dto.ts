/**
 * @fileoverview Criação de DTOs exclusivos do client
 */

export interface CreateClientDto {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  cpf: string;
  cellphone: string;
}
