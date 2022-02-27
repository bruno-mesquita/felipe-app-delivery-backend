import type { TCreationAttributes, TModelAttributes } from '@core/menu';

export interface ICreateMenuDto extends Pick<TCreationAttributes, 'name' | 'active' | 'priority'> {
  establishmentId: number;
}

export type IUpdateMenuDto = Partial<ICreateMenuDto> & Pick<TModelAttributes, 'id'>;

export type IFindOneMenuDto = {
  id: number;
  establishmentId: number;
};

export type IDeleteMenuDto = IFindOneMenuDto;
