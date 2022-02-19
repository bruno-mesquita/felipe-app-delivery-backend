export interface ICreateNeighborhood {
  name: string;
  active: boolean;
  city: number;
}

export type IUpdateNeighborhood = Partial<{
  name: string;
  active: boolean;
  city: number;
}> & { id: number }

export type IDeleteNeighborhood = { id: number; }
