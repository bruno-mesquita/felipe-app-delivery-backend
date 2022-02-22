export interface UpdatePasswordEstablishmentDto {
  id: number;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
