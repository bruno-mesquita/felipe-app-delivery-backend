import { object, SchemaOf, string, number, boolean } from 'yup';

import { UpdateEstablishmentDto } from '../dtos/update-establishment-dto';

const phoneRegxp =
  /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/;

const schema: SchemaOf<UpdateEstablishmentDto> = object({
  id: number().required(),
  name: string().trim().required(),
  cellphone: string()
    .trim()
    .required()
    .matches(phoneRegxp, 'Telefone inválido'),
  openingTime: number().min(0).max(23).required(),
  closingTime: number().required(),
  freightValue: number().required(),
  userId: number().required(),
  active: boolean(),
  address: object({
    street: string().trim().required(),
    number: string().trim().required(),
    neighborhood: string().trim().required(),
    cep: string().trim().required(),
    city: number().integer().required(),
  }),
});

export default schema;
