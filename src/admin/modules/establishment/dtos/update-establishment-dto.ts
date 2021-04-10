/**

 * @fileoverview Update de DTOs exclusivos do estabelecimento

 * @author Jonatas Rosa Moura

 */

export interface UpdateEstablishmentDto {
  id: number;

  name: string;

  email: string;

  cellphone: string;

  freightValue: number;

  openingTime: number;

  closingTime: number;

  active: boolean;
}
