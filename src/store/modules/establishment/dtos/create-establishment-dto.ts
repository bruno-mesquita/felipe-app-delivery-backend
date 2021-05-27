/**
 * @fileoverview Criação de DTOs exclusivos do estabelecimento
 * @author Jonatas Rosa Moura
 */

export interface CreateEstablishmentDto {
  name: string;
  email: string;
  password: string;
  cellphone: string;
  active: boolean;
  openingTime: number;
  closingTime: number;
  freightValue: number;
  image: string;
  categories: number[];
  userId: number;
  address: {
    street: string;
    number: number;
    neighborhood: string;
    cep: string;
    city: number;
  };
}
