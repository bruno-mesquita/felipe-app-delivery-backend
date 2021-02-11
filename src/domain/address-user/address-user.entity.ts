import { Entity, OneToOne, JoinColumn } from 'typeorm';

import EntityBase from '@shared/entity';
import { User } from '@domain/user';
import { Address } from '@domain/address';

@Entity({ name: 'address-user' })
class AddressUser extends EntityBase {
  @OneToOne(() => User)
  @JoinColumn()
  user_id: User;

  @OneToOne(() => Address)
  @JoinColumn()
  address_id: Address;
}

export default AddressUser;
