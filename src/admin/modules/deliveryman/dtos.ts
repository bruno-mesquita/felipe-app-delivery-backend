interface IDeliveryMan {
  name: string;
	cellphone: string;
	entry_date: string;
	departure_date: string;
  city_id: number;
}

export interface ICreateDeliverymanDto extends IDeliveryMan {}

export interface IUpdateDeliverymanDto extends IDeliveryMan {
  id: number;
}
