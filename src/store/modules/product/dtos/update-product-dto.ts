export type UpdateProductDto = Partial<{
  name: string;
  price: number;
  description: string;
  menu: number;
  menu_id: number;
  image: string;
  active: boolean;
}> & { id: number };
