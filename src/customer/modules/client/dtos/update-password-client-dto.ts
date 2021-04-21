/**
 * @fileoverview Criação de DTOs exclusivos do client
 */

export interface UpdatePasswordClientDto {
  id: number;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
