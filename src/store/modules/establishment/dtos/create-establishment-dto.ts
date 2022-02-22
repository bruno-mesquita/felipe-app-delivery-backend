/**
 * @fileoverview Criação de DTOs exclusivos do estabelecimento
 * @author Jonatas Rosa Moura
 */

export interface CreateEstablishmentDto {
  name: string;
  cellphone: string;
  openingTime: number;
  closingTime: number;
  freightValue: number;
  image: string;
  categories: number[];
  userId: number;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    cep: string;
    city: number;
  };
}
