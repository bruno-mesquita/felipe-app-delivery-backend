import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

import City from '@modules/city/typeorm/entity';
import EntityBase from '@shared/utils/entity';

@Entity('address')
class Address extends EntityBase {
  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  neighborhood: string;

  @OneToOne(() => City)
  @JoinColumn({ name: 'city_id' })
  city: City;

  @Column()
  cep: string;
}

export default Address;
