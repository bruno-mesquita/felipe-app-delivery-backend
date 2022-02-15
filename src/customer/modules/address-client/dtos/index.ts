type IClientAddress = {
  street: string;
  number: string;
  neighborhood: string;
  cep: string;
  city: number;
  nickname: string;
  active: boolean;
}


export interface IClientAddressDto extends Omit<IClientAddress, 'active'> {
  userId: number;
}

export interface IUpdateClientAddressDto extends IClientAddress  {
  id: number;
}
