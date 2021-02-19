/**
 * @fileoverview Casos de testes para a criação do cliente
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { Entity, OneToOne, JoinColumn, Column } from 'typeorm';

import EntityBase from '@shared/utils/entity';
import Client from '@core/client';
import Address from '@core/address';

@Entity('client_address')
class AddressClient extends EntityBase {
  @Column()
  nickname: string;

  @OneToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client_id: Client;

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address_id: Address;
}

export default AddressClient;
