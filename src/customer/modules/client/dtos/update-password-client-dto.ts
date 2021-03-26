/**
 * @fileoverview Criação de DTOs exclusivos do client
 */

export interface UpdatePasswordClientDto {
  id: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
