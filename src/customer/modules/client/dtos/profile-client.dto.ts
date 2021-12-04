export type Select = 'avatar' | 'name' | 'email' | 'cpf' | 'active'

export interface IProfileClientDto {
  id: number;
  selects: Select[];
}
