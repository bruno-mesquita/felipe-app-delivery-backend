/**
 * @fileoverview Casos de testes para a criação do cliente
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { Entity, OneToOne, JoinColumn, Column, ManyToOne } from 'typeorm';

import EntityBase from '@shared/utils/entity';
import Client from '@core/client';
import Address from '@core/address';

@Entity('client_address')
class AddressClient extends EntityBase {
  @Column()
  nickname: string;

  @ManyToOne(() => Client, (client) => client.adresses)
  @JoinColumn({ name: 'client_id' })
  client_id: Client;

  @ManyToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address_id: Address;

  public setNickname(nickname: string): void {
    this.nickname = nickname;
  }
}

export default AddressClient;
