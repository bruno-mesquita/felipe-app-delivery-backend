interface IClient {
  name: string;
  email: string;
  password: string;
  cpf: string;
  cellphone: string;
  city: number;
}

export type Select = 'avatar' | 'active' | keyof Pick<IClient, 'name' | 'email' | 'cpf' | 'cellphone'>;

export interface ICreateClientDto extends IClient {
  confirmPassword: string;
}

export interface IUpdateClientDto extends Pick<IClient, 'name' | 'email' | 'cellphone'> {
  id: number;
}

export interface IActiveClientDto {
  userId: number;
  code: string;
}

export interface IProfileClientDto {
  id: number;
  selects: Select[];
}

export interface IUpdatePasswordClientDto {
  id: number;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface IListOrdersClient {
  clientId: number;
  page: number;
}
