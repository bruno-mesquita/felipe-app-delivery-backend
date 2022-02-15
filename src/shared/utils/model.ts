
export type ModelProps<T> = T & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
