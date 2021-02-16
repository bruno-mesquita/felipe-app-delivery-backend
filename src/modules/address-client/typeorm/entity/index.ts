/**
 * @fileoverview Casos de testes para a criação do cliente
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { Entity, OneToOne, JoinColumn, Column } from 'typeorm';

import EntityBase from '@shared/utils/entity';
import { Client } from '@modules/client';
import Address from '@modules/address/typeorm/entity/address.entity';

@Entity('client_address')
class AddressClient extends EntityBase {
  @Column()
  nickname: string;

  @OneToOne(() => Client)
  @JoinColumn()
  client_id: Client;

  @OneToOne(() => Address)
  @JoinColumn()
  address_id: Address;
}

export default AddressClient;
