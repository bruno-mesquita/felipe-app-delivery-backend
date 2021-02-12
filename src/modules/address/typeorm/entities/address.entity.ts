import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import StateAddress from './stateAddress.entity';

@Entity('address')
class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column()
  cep: number;

  // Um endereço tem um estado e um estado tem um endereço
  @OneToOne(() => StateAddress)
  @JoinColumn({ name: 'state_id' })
  state: StateAddress;
}

export default Address;
