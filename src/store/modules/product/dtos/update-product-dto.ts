/**
 * @fileoverview Update de DTOs exclusivos de Produtos
 * @author Jonatas Rosa Moura
 */

 export interface UpdateProductDto {
  id: number;
  name: string;
  price: number;
  description: string;
  menu: number;
  image: string;
}
