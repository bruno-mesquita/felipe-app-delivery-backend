/**
 * @fileoverview Criação de DTOs exclusivos do client
 */

export interface UpdatePasswordClientDto {
  id: string;
  password: string;
  newPassword: string;
}
