import { Entity, Column } from 'typeorm';

@Entity()
class Address {
  @Column()
  zipCode: string;

  @Column()
  number: number;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  street: string;

  @Column()
  neighborhood: string;
}

export default Address;
