export type UpdateMenuDto = Partial<{
  name: string;
  establishmentId: number;
  active: boolean;
} & { id: number }>
