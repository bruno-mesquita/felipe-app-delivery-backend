export interface IResetPasswordDto {
  code: string;
  newPassword: string;
  confirmPassword: string;
  cellphone: string;
}
