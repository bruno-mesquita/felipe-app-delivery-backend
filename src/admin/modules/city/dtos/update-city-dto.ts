export interface UpdateCityDto {
  _id: string;
  name: string;
  state: string;
  active: boolean;
  neighborhoods: string[];
}
