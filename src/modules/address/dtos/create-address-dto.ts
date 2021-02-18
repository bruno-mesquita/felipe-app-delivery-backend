/**
 * @fileoverview Criação de DTOs exclusivos de Endereço
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura

*/

export interface CreateAddressDto {
  street: string;

  number: number;

  neighborhood: string;

  cep: string;

  // city: string;
}
