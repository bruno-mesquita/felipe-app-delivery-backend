export interface CreateOwnerDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  cellphone: string;
  active: boolean;
  cpf: string;
  created_by_id: number;
}
