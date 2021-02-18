/**
 * @fileoverview Criação de DTOs exclusivos do estabelecimento
 * @author Jonatas Rosa Moura
 */

export interface CreateEstablishmentDto {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  cellphone: string;
}
