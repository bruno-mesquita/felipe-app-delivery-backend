/**
 * @fileoverview Criação de DTOs exclusivos do estabelecimento
 */

export interface CreateEstablishmentDto {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  cellphone: string;
}
