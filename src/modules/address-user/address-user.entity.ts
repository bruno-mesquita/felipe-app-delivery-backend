import { Entity, OneToOne, JoinColumn, Column } from 'typeorm';

import EntityBase from '@shared/utils/entity';
import User from '@modules/user';
import Address from '@modules/address/typeorm/entities/address.entity';

@Entity({ name: 'address-user' })
class AddressUser extends EntityBase {
  @OneToOne(() => User)
  @JoinColumn()
  user_id: User;

  @OneToOne(() => Address)
  @JoinColumn()
  address_id: Address;

  @Column()
  nickname: string;
}

export default AddressUser;
