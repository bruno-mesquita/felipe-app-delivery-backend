export interface UpdateEstablishmentDto {
  id: number;
  name: string;
  cellphone: string;
  openingTime: number;
  closingTime: number;
  freightValue: number;
  userId: number;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    cep: string;
    city: number;
  };
}
