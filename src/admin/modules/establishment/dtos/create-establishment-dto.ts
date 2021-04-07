/**
 * @fileoverview Criação de DTOs exclusivos do estabelecimento
 * @author Jonatas Rosa Moura
 */

export interface CreateEstablishmentDto {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  cellphone: string;
  openingTime: number;
  closingTime: number;
  freightValue: number;
  image: {
    name: string;
    encoded: string;
  };
  categories: number[];
  address: {
    street: string;
    number: number;
    neighborhood: string;
    cep: string;
    city: number;
  };
}
