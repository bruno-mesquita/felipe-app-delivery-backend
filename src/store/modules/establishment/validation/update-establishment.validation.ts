import { object, SchemaOf, string, number } from 'yup';

import { UpdateEstablishmentDto } from '../dtos/update-establishment-dto';

const REQUIRED = 'Campo obrigátorio';

const phoneRegxp = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/;

const schema: SchemaOf<UpdateEstablishmentDto> = object({
  id: number().required(REQUIRED),
  name: string().required(REQUIRED),
  cellphone: string().required(REQUIRED).matches(phoneRegxp, 'Telefone inválido'),
  openingTime: number().min(0).max(23).required(REQUIRED),
  closingTime: number().required(REQUIRED),
  freightValue: number().required(REQUIRED),
  userId: number().required(REQUIRED),
  address: object({
    street: string().required(REQUIRED),
    number: string().required(REQUIRED),
    neighborhood: string().required(REQUIRED),
    cep: string().required(REQUIRED),
    city: number().integer().required(REQUIRED),
  }),
});

export default schema;
