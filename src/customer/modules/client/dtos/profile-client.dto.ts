export type Select = 'avatar' | 'name' | 'email' | 'cpf' | 'active' | 'cellphone'
export interface IProfileClientDto {
  id: number;
  selects: Select[];
}
