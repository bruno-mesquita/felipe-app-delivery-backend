import { Entity, OneToOne, JoinColumn, Column } from 'typeorm';

import EntityBase from '@shared/utils/entity';
import { Client } from '@modules/client';
import Address from '@modules/address/typeorm/entities/address.entity';

@Entity({ name: 'address-client' })
class AddressClient extends EntityBase {
  @OneToOne(() => Client)
  @JoinColumn()
  client_id: Client;

  @OneToOne(() => Address)
  @JoinColumn()
  address_id: Address;

  @Column()
  nickname: string;
}

export default AddressClient;
