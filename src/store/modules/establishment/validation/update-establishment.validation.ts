import { object, SchemaOf, string, number } from 'yup';

import { UpdateEstablishmentDto } from '../dtos/update-establishment-dto';

const REQUIRED = 'Campo obrigátorio';

const phoneRegxp = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/;

const schema: SchemaOf<UpdateEstablishmentDto> = object({
  id: number().required(),
  name: string().required(),
  cellphone: string().required().matches(phoneRegxp, 'Telefone inválido'),
  openingTime: number().min(0).max(23).required(),
  closingTime: number().required(),
  freightValue: number().required(),
  userId: number().required(),
  address: object({
    street: string().required(),
    number: string().required(),
    neighborhood: string().required(),
    cep: string().required(),
    city: number().integer().required(),
  }),
});

export default schema;
